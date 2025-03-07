import { validateJWT } from "./validate-jwt.js"

export const isAdmin = (req, res, next) => {
  validateJWT(req, res, () => {
    if (req.usuario.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "El servicio requiere el rol de admin",
      })
    }
    next()
  })
}

export const hasRoles = (...roles) => {
  return (req, res, next) => {
    validateJWT(req, res, () => {
      if (!roles.includes(req.usuario.role)) {
        return res.status(401).json({
          success: false,
          message: `El servicio requiere uno de estos roles: ${roles.join(", ")}`,
        })
      }
      next()
    })
  }
}
