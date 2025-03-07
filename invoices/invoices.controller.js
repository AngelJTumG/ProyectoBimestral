import Factura from "./invoices.model.js";

export const historialFactura = async (req, res) => {
  try {
    const usuarioId = req.usuario._id
    const facturas = await Factura.find({ usuarioId }).populate({
      path: "productos.productoId",
      model: "Product",
    })

    if (!facturas || facturas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron facturas para este usuario",
      })
    }

    res.status(200).json({
      success: true,
      facturas,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las facturas",
      error: err.message,
    })
  }
}

