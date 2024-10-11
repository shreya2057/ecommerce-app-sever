import { Router } from "express";
import {
  login_controller,
  otp_send_controller,
  otp_verify_controller,
  registration_controller,
} from "../controller/auth_controller";
import {
  otp_validation,
  registration_validation,
} from "../middleware/registration_validation";
import { login_validation } from "../middleware/login_validation";

/**
 * @swagger
 * /users/registration/:
 *   post:
 *     tags:
 *      - Users
 *     summary: User registration
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               full_name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               phone_number:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               confirm_password:
 *                 type: string
 *                 required: true
 *               date_of_birth:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

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

/**
 * @swagger
 * /users/login/:
 *   post:
 *     tags:
 *      - Users
 *     summary: User authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

const router = Router();

router.post("/registration/", registration_validation, registration_controller);
router.post("/send-otp/", otp_validation, otp_send_controller);
router.post("/verify-otp/", otp_validation, otp_verify_controller);
router.post("/login", login_validation, login_controller);

export default router;