import jwt from "jsonwebtoken";
import Cliente from "../cliente/cliente.model.js";

export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No existe token en la petición"
            });
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.KEY);

        const cliente = await Cliente.findById(uid);

        if (!cliente) {
            return res.status(400).json({
                success: false,
                message: "El cliente no existe en la DB"
            });
        }

        if (cliente.status === false) {
            return res.status(400).json({
                success: false,
                message: "Cliente desactivado previamente"
            });
        }

        req.usuario = cliente;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        });
    }
};