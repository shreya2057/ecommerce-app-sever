import { Router } from "express";
import { add_to_cart, get_cart_count } from "../controller/orders";
import { authorizeUser } from "../middleware/authorization";
import { cart_validation } from "../middleware/orders";

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

/**
 * @swagger
 * /carts/cart-count/:
 *   get:
 *     tags:
 *      - Carts
 *     summary: Get cart count
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 */

const router = Router();
router.post("/add-to-cart/", authorizeUser, cart_validation, add_to_cart);
router.get("/cart-count/", authorizeUser, get_cart_count);

export default router;
