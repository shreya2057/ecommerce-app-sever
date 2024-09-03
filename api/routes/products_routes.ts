import { Router } from "express";
import { post_products } from "../controller/products_controller";
import { uploadImage } from "../middleware/image_upload";

const router = Router();

/**
 * @swagger
 * /products/add-products/{category_id}:
 *   post:
 *     summary: Upload an Image
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

router.post("/add-products/:category_id", uploadImage, post_products);

export default router;
