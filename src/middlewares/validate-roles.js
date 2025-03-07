export const isAdmin = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            success: false,
            message: "Se quiere verificar un rol antes de validar el token"
        });
    }

    if (req.usuario.role !== 'ADMIN') {
        return res.status(401).json({
            success: false,
            message: "El servicio requiere el rol de admin"
        });
    }
    next();
};

export const hasRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Se quiere verificar un rol antes de validar el token"
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                success: false,
                message: `El servicio requiere uno de estos roles: ${roles.join(', ')}`
            });
        }
        next();
    };
};