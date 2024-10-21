import { Router } from "express";
import { register_validation } from "../../middleware/auth";
import { register_controller } from "../../controller/auth";

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

const registerRouter = Router();

registerRouter.post("/registration/", register_validation, register_controller);

export default registerRouter;
