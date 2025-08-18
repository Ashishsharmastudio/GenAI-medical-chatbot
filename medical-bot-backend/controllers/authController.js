import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/index.js";

function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });
}

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ error: "Email in use" });

    const user = new User({ email, password });
    await user.save();

    const token = createToken(user._id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = createToken(user._id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
