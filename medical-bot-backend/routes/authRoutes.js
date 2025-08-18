import { Router } from "express";
import { signup, login } from "../controllers/authController.js";
import { validateBody } from "../utils/validator.js";
import Joi from "joi";

const router = Router();

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", login);

export default router;
