import { Router } from "express";
import { registration_controller } from "../controller/auth_controller";
import { registration_validation } from "../middleware/registration_validation";

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

const router = Router();

router.post("/registration/", registration_validation, registration_controller);

export default router;
