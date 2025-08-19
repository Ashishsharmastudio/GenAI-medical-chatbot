// /medical-bot-backend/controllers/authController.js
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/index.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// -------------------- helpers --------------------
function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
}

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim();
}

function publicUser(user) {
  return {
    id: user._id,
    email: user.email,
    name: user.name || null,
    picture: user.picture || null,
    provider: user.provider,
  };
}

// -------------------- controllers --------------------
export async function signup(req, res, next) {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({
      email,
      password,
      provider: "local",
      lastLoginAt: new Date(),
    });
    await user.save();

    const token = createToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // block password login for Google-only accounts
    if (user.provider === "google" && !user.password) {
      return res
        .status(400)
        .json({
          error: "This account uses Google Sign-In. Use /api/auth/google.",
        });
    }

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    user.lastLoginAt = new Date();
    await user.save();

    const token = createToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}

export async function googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });

    // Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = normalizeEmail(payload.email);
    const name = payload.name || null;
    const picture = payload.picture || null;

    if (!email) {
      return res.status(400).json({ error: "Google profile missing email" });
    }

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = new User({
        email,
        provider: "google",
        googleId,
        name,
        picture,
        googleProfile: payload,
        lastLoginAt: new Date(),
      });
      await user.save();
    } else {
      user.provider = "google";
      user.googleId = user.googleId || googleId;
      user.name = name || user.name;
      user.picture = picture || user.picture;
      user.googleProfile = payload;
      user.lastLoginAt = new Date();
      await user.save();
    }

    const token = createToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    err.statusCode = 401; // invalid token / wrong audience
    next(err);
  }
}
