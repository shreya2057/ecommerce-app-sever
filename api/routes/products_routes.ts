import { Router } from "express";
import { upload } from "../config/mutler";
import {
  get_featured_products,
  get_products,
  get_products_details,
  post_products,
} from "../controller/products_controller";

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
 *               is_featured:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /products/featured-products/:
 *   get:
 *     tags:
 *      - Products
 *     summary: Featured Products
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /products/product-detail/{id}/:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get Product detail
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get("/get-products/", get_products);

router.post(
  "/add-products/:category_id",
  upload.single("image"),
  post_products,
);

router.get("/featured-products/", get_featured_products);
router.get("/product-detail/:id/", get_products_details);

export default router;
