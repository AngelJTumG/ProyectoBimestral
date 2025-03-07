import { Router } from "express";
import { historialFactura } from "./invoices.controller.js"
import { validarFactura } from "../middlewares/factura-validate.js"

const router = Router()

/**
 * @swagger
 * /supermercado/v1/invoices/historialFactura:
 *   get:
 *     summary: Get invoice history
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 invoices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Server error
 */
router.get("/historialFactura", validarFactura, historialFactura)

export default router;