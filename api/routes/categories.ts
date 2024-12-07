import { Router } from "express";
import {
  add_categories,
  get_all_categories,
  get_categories,
  get_deleted_categories,
  update_category,
} from "../controller/products";
import {
  category_update_validation,
  category_validation,
} from "../middleware/products";

/**
 * @swagger
 * /categories/get-categories/:
 *   get:
 *     tags:
 *      - Categories
 *     summary: Get Categories
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /categories/get-all-categories/:
 *   get:
 *     tags:
 *      - Categories
 *     summary: Get all Categories
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /categories/get-deleted-categories/:
 *   get:
 *     tags:
 *      - Categories
 *     summary: Get deleted Categories
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /categories/add-categories/:
 *   post:
 *     tags:
 *      - Categories
 *     summary: Add a Category
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /categories/update-category/{id}/:
 *   patch:
 *     tags:
 *      - Categories
 *     summary: Update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: The category id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

const router = Router();

router.get("/get-categories/", get_categories);
router.get("/get-all-categories/", get_all_categories);
router.get("/get-deleted-categories/", get_deleted_categories);
router.post("/add-categories/", category_validation, add_categories);
router.patch(
  "/update-category/:id/",
  category_update_validation,
  update_category,
);

export default router;
