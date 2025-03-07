import { Router } from "express";
import { createdProductValidator, deleteProductValidator, updateProductValidator, getProductByNameValidator, getProductSouldOutValidator } from "../middlewares/product-validator.js";
import { addProduct, deleteProduct, getProduct, getProductByCategory, getProductByName, updateProduct, getProductSoldOut, getTopSellingProducts } from "./product.controller.js";

/**
 * @swagger
 * /supermercado/v1/product/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
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
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product/findProduct/{nameProduct}:
 *   get:
 *     summary: Get a product by name
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: nameProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: The product name
 *     responses:
 *       200:
 *         description: The product description by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: The list of products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product/soldOut:
 *   get:
 *     summary: Get sold out products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of sold out products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product/updateProduct/{uid}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
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
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/product/deleteProduct/{uid}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted
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

/**
 * @swagger
 * /supermercado/v1/product/topSellingProducts:
 *   get:
 *     summary: Get top selling products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of top selling products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

const router = Router();

router.post("/addProduct",createdProductValidator, addProduct);

router.get("/findProduct/:nameProduct", getProductByNameValidator, getProductByName);

router.get("/", getProduct);

router.get("/category/:categoryId", getProductByCategory);

router.get("/soldOut/", getProductSouldOutValidator, getProductSoldOut);

router.put("/updateProduct/:uid", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:uid", deleteProductValidator, deleteProduct);

router.get("/topSellingProducts", getTopSellingProducts);

export default router;