import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./categoria.controller.js";
import { createdCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validator.js";

/**
 * @swagger
 * /supermercado/v1/categoria/addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 category:
 *                   $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/categoria:
 *   get:
 *     summary: Get all categories
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/categoria/updateCategory/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The category was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 category:
 *                   $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/categoria/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The category was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

const router = Router();

router.post("/addCategory", createdCategoryValidator, addCategory);

router.get("/", getCategory);

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;