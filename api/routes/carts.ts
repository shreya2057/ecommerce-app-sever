import { Router } from "express";
import { add_to_cart } from "../controller/orders";
import { authorizeUser } from "../middleware/authorization";

/**
 * @swagger
 * /carts/add-to-cart/:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Add to cart
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               number:
 *                 type: number
 *               product:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */

const router = Router();
router.post("/add-to-cart/", authorizeUser, add_to_cart);

export default router;
