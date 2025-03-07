import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Comercial API",
      version: "1.0.0",
      description: "API para una gestión comercial",
      contact: {
        name: "Angel Javier Tum González",
        email: "atum-2023017@kinal.edu.gt",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/supermercado/v1",
      },
    ],
  },
  apis: [
    "./src/auth/auth.routes.js",
    "./src/cliente/cliente.routes.js",
    "./src/categoria/categoria.routes.js",
    "./src/product/product.routes.js",
    "./src/carrito/carrito.routes.js",
    "./src/invoices/invoices.routes.js",
  ],
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }