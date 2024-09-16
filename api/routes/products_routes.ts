import { Router } from "express";
import { upload } from "../config/mutler";
import { get_products, post_products } from "../controller/products_controller";

const router = Router();

/**
 * @swagger
 * /products/get-products/:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get Products
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: The category id
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The product name
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /products/add-products/{category_id}:
 *   post:
 *     tags:
 *      - Products
 *     summary: Add a Product
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 required: true
 *               price:
 *                 type: string
 *                 required: true
 *               discount:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get("/get-products/", get_products);

router.post(
  "/add-products/:category_id",
  upload.single("image"),
  post_products
);

export default router;
