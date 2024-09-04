import { Router } from "express";
import { upload } from "../config/mutler";
import {
  get_all_products,
  get_categorywise_products,
  post_products,
} from "../controller/products_controller";

const router = Router();

/**
 * @swagger
 * /products/get-all-products/:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get all Products
 *     parameters:
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
 * /products/get-products/{category_id}:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get Category wise Products
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
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
 *         description: Image uploaded successfully
 */

router.get("/get-all-products/", get_all_products);

router.get("/get-products/:category_id", get_categorywise_products);

router.post(
  "/add-products/:category_id",
  upload.single("image"),
  post_products
);

export default router;
