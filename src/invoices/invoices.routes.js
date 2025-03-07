import { Router } from "express";
import { historialFactura } from "./invoices.controller.js"
import { validarFactura } from "../middlewares/factura-validate.js"

const router = Router()

router.get("/historialFactura", validarFactura, historialFactura)

export default router;