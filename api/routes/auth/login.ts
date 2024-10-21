import { Router } from "express";
import { login_validation } from "../../middleware/auth";
import { login_controller } from "../../controller/auth";

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

const loginRouter = Router();

loginRouter.post("/login", login_validation, login_controller);

export default loginRouter;
