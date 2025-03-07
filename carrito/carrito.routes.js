import { Router } from "express";
import { agregarProductosAlCarrito, obtenerProductosDelCarrito, completarCompra } from "./carrito.controller.js";
import { validarCarrito } from "../middlewares/carrito-validate.js";

/**
 * @swagger
 * /supermercado/v1/carrito/agregarCarrito:
 *   post:
 *     summary: Add products to the cart
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Products added to the cart
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
 * /supermercado/v1/carrito:
 *   get:
 *     summary: Get products from the cart
 *     tags: [Carrito]
 *     responses:
 *       200:
 *         description: List of products in the cart
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
 * /supermercado/v1/carrito/completarCompra/{carritoId}:
 *   post:
 *     summary: Complete the purchase
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: carritoId
 *         schema:
 *           type: string
 *         required: true
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: Purchase completed
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

router.post("/agregarCarrito", validarCarrito, agregarProductosAlCarrito);

router.get("/", validarCarrito, obtenerProductosDelCarrito);

router.post("/completarCompra/:carritoId", validarCarrito, completarCompra);

export default router;