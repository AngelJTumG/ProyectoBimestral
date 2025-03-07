"use strict"

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRoutes from "../src/auth/auth.routes.js";
import clienteroutes from "../src/cliente/cliente.routes.js";
import categoriaRoutes from "../src/categoria/categoria.routes.js";
import productoRoutes from "../src/product/product.routes.js";
import carritoRoutes from "../src/carrito/carrito.routes.js";
import facturaRoutes from "../src/invoices/invoices.routes.js"; 
import { swaggerDocs, swaggerUi } from "./swagger.js";
import createAdmin from "./admin.js";
import createCategory from "./categoria.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        await createAdmin();
        await createCategory();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
}

const routes = (app) => {
    app.use("/supermercado/v1/auth", authRoutes);
    app.use("/supermercado/v1/cliente", clienteroutes);
    app.use("/supermercado/v1/categoria", categoriaRoutes);
    app.use("/supermercado/v1/producto", productoRoutes);
    app.use("/supermercado/v1/carrito", carritoRoutes);
    app.use("/supermercado/v1/factura", facturaRoutes); 
    app.use("/supermercado/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}