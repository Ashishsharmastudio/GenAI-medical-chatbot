// /medical-bot-backend/controllers/authController.js

import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/index.js";

// -----------------------------------------
// ✅ Support MULTIPLE GOOGLE CLIENT IDs
// -----------------------------------------
const allowedClientIds = process.env.GOOGLE_CLIENT_IDS
  ? process.env.GOOGLE_CLIENT_IDS.split(",").map((id) => id.trim())
  : process.env.GOOGLE_CLIENT_ID
  ? [process.env.GOOGLE_CLIENT_ID]
  : [];

console.log("✔ Allowed Google OAuth Client IDs:", allowedClientIds);

const googleClient = new OAuth2Client();

// -------------------- helpers --------------------
function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
}

function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
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

// ----------------------- SIGNUP -----------------------
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

// ----------------------- LOGIN -----------------------
export async function login(req, res, next) {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Block if they are supposed to login via Google
    if (user.provider === "google" && !user.password) {
      return res.status(400).json({
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

// ----------------------- GOOGLE LOGIN -----------------------
export async function googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });

    // -----------------------------------------------
    // 🔥 Verify Google ID token with MULTIPLE CLIENT IDs
    // -----------------------------------------------
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: allowedClientIds,   // <-- IMPORTANT CHANGE
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = normalizeEmail(payload.email);
    const name = payload.name || payload.given_name || null;
    const picture = payload.picture || null;

    // Extract additional Google profile info
    const profile = {
      name,
      picture,
      givenName: payload.given_name || null,
      familyName: payload.family_name || null,
      locale: payload.locale || null,
      email,
      emailVerified: payload.email_verified || false,
    };

    if (!email) {
      return res.status(400).json({ error: "Google profile missing email" });
    }

    // Find existing user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new Google user
      user = new User({
        email,
        provider: "google",
        googleId,
        name: profile.name,
        picture: profile.picture,
        googleProfile: profile,
        lastLoginAt: new Date(),
      });
      await user.save();
    } else {
      // Update user with latest Google data
      user.provider = "google";
      user.googleId = user.googleId || googleId;

      user.name = profile.name;
      user.picture = profile.picture;
      user.googleProfile = profile;
      user.lastLoginAt = new Date();

      await user.save();
    }

    const token = createToken(user._id);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    console.error("💥 Google Login Error:", err);
    err.statusCode = 401;
    next(err);
  }
}

// ----------------------- ME -----------------------
export async function me(req, res, next) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
}
