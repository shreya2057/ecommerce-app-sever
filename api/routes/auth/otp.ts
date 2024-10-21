import { Router } from "express";
import { otp_validation } from "../../middleware/auth";
import {
  otp_send_controller,
  otp_verify_controller,
} from "../../controller/auth";

/**
 * @swagger
 * /users/send-otp/:
 *   post:
 *     tags:
 *      - Users
 *     summary: Send OTP
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /users/verify-otp/:
 *   post:
 *     tags:
 *      - Users
 *     summary: Verify OTP
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               otp:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

const otpRouter = Router();
otpRouter.post("/send-otp/", otp_validation, otp_send_controller);
otpRouter.post("/verify-otp/", otp_validation, otp_verify_controller);

export default otpRouter;
