import { queryRag } from "../services/ragService.js";
import Message from "../models/Message.js";

export async function chat(req, res, next) {
  try {
    const { question } = req.body;
    // Pass the logged-in user's ID so queryRag scopes to their uploaded PDFs
    const answer = await queryRag(question, 8, req.user.id);
    await Message.create({
      userId: req.user.id,
      question,
      answer,
      meta: {},
    });
    res.json({ answer });
  } catch (err) {
    next(err);
  }
}
