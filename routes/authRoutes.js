import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many request, please try again after 15 minutes",
});

import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import { register, login, updateUser } from "../controllers/authController.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);
// ↑ don't forget, this is a "patch" request
export default router;
