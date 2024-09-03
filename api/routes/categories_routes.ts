import { Router } from "express";
import { categories_validation } from "../middleware/categories_validation";
import {
  add_categories,
  get_categories,
} from "../controller/categories_controller";

/**
 * @swagger
 * /categories/get-categories/:
 *   get:
 *     summary: Get Categories
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /categories/add-categories/:
 *   post:
 *     summary: Add Categories
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
router.post("/add-categories/", categories_validation, add_categories);

export default router;
