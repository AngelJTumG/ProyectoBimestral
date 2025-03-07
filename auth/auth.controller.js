import { hash, verify } from "argon2";
import Cliente from "../cliente/cliente.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
        
        data.role = "CLIENTE"; 

        const cliente = await Cliente.create(data);

        return res.status(201).json({
            message: "Cliente ha sido creado",
            nombre: cliente.nombre,
            email: cliente.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Registro de cliente fallido",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ email: email });

        if (!cliente) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el cliente con el correo ingresado"
            });
        }

        const validPassword = await verify(cliente.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(cliente.id);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token,
                profilePicture: cliente.profilePicture
            }
        });
    } catch (err) {
        console.error("Error during login:", err.message, err.stack); // Agrega más detalles del error
        return res.status(500).json({
            message: "Inicio de sesión fallido, error del servidor",
            error: err.message
        });
    }
};

export const registerAdmin = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
        data.profilePicture = profilePicture;
        data.role = "ADMIN";

        const user = await Cliente.create(data);

        return res.status(201).json({
            message: "Administrador ha sido creado",
            nombre: user.nombre,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "Registro de administrador fallido",
            error: err.message
        });
    }
};
