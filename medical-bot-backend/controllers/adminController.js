  import jwt from "jsonwebtoken";
  import User from "../models/User.js";
  import { JWT_SECRET } from "../config/index.js";

  export async function signup(req, res, next) {
    try {
      const { email, password } = req.body;
      if (await User.findOne({ email }))
        return res.status(400).json({ error: "Email in use" });

      const user = new User({ email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, JWT_SECRET);
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

      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
  export async function status(req, res) {
    try {
      // Optional: add any quick checks here (DB ping, index state, etc.)
      // Keep it fast—this endpoint should never block.
      res.json({
        ok: true,
        service: "admin",
        environment: process.env.NODE_ENV || "development",
        pid: process.pid,
        uptimeSec: Number(process.uptime().toFixed(2)),
        memoryMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
        node: process.version,
        timestamp: new Date().toISOString(),
        user: req.user?.id || null, // set by auth middleware if present
      });
    } catch (err) {
      // Don’t leak internals; keep response stable.
      res.status(500).json({ ok: false, error: "Admin status check failed" });
    }
  }