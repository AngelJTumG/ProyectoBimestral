import mongoose from 'mongoose';
import Carrito from "./carrito.model.js"
import Factura from "../invoices/invoices.model.js"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const agregarProductosAlCarrito = async (req, res) => {
  try {
    const { productos } = req.body
    const usuarioId = req.usuario._id

    let carrito = await Carrito.findOne({ usuarioId })

    if (!carrito) {
      carrito = new Carrito({ usuarioId, productos: [] })
    }

    for (const producto of productos) {
      const productoExistente = carrito.productos.find(
        (p) => p.productoId.toString() === producto.productoId
      )
      if (productoExistente) {
        productoExistente.cantidad += producto.cantidad
      } else {
        carrito.productos.push({
          productoId: producto.productoId,
          cantidad: producto.cantidad,
        })
      }
    }

    await carrito.save()

    res.status(200).json({
      success: true,
      message: "Productos agregados al carrito",
      carrito,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al agregar productos al carrito",
      error: err.message,
    })
  }
}

export const obtenerProductosDelCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario._id
    const carrito = await Carrito.findOne({ usuarioId }).populate("productos.productoId")

    if (!carrito) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      })
    }

    res.status(200).json({
      success: true,
      productos: carrito.productos,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos del carrito",
      error: err.message,
    })
  }
}

export const completarCompra = async (req, res) => {
  try {
    const usuarioId = req.usuario._id
    const carrito = await Carrito.findOne({ usuarioId }).populate("productos.productoId")
    if (!carrito || carrito.productos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El carrito está vacío o no existe",
      })
    }

    let total = 0
    const productosComprados = []

    for (const item of carrito.productos) {
      const producto = item.productoId
      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          message: `Hay pocas unidades disponibles para el producto ${producto.nombrePro}`,
        })
      }
      producto.stock -= item.cantidad
      producto.ventas += item.cantidad
      await producto.save()

      const totalProducto = producto.precio * item.cantidad
      total += totalProducto
      productosComprados.push({
        productoId: producto._id,
        nombrePro: producto.nombrePro,
        cantidad: item.cantidad,
        precio: producto.precio,
        totalProducto,
      })
    }

    const metodoPago = {
      nombreTarjeta: req.body.nombreTarjeta,
      numeroTarjeta: req.body.numeroTarjeta,
      fechaExpiracion: req.body.fechaExpiracion,
      cvv: req.body.cvv,
    }

    const factura = new Factura({
      usuarioId: req.usuario._id,
      productos: productosComprados,
      total,
      fecha: new Date(),
      metodoPago,
    })

    await factura.save()

    carrito.productos = []
    await carrito.save()

    const doc = new PDFDocument()
    const filePath = path.join(
      __dirname,
      "../../public/uploads/invoice-doc",
      `factura-${req.usuario._id}_${Date.now()}.pdf`
    )
    doc.pipe(fs.createWriteStream(filePath))
    doc.fontSize(16).text("Factura", { align: "center" })
    doc.moveDown(1)
    doc.fontSize(12).text(`Fecha: ${new Date().toLocaleString()}`, { align: "right" })
    doc.moveDown(1)
    doc.text("----------------------------------")
    doc.text(`Usuario: ${req.usuario.nombre}`)
    doc.text("----------------------------------")
    doc.moveDown(1)

    productosComprados.forEach((producto) => {
      doc.text(`Producto: ${producto.nombrePro}`)
      doc.text(`Cantidad: ${producto.cantidad}`)
      doc.text(`Precio: Q.${producto.precio}.00`)
      doc.text(`Total: Q.${producto.totalProducto}.00`)
      doc.text("----------------------------------")
    })
    doc.text(`Total: Q.${total}.00`)
    doc.text("----------------------------------")
    doc.end()

    return res.status(200).json({
      success: true,
      message: "Compra completada",
      factura,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al completar la compra",
      error: error.message,
    })
  }
}