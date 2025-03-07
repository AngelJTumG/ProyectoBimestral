import { body, param } from "express-validator";
import { emailExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles, isAdmin } from "./validate-roles.js"

export const registerValidator = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("No es un email válido"),
  body("email").custom(emailExists),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "El password debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un símbolo"
    ),
  validarCampos,
  deleteFileOnError,
  handleErrors,
]

export const loginValidator = [
  body("email").notEmpty().withMessage("El email es requerido"),
  body("email").isEmail().withMessage("No es un email válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors,
]

export const getUserByIdValidator = [
  validateJWT,
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
]

export const getClientesValidator = [validateJWT]

export const deleteUserValidator = [
  validateJWT,
  isAdmin,
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
]

export const updatePasswordValidator = [
  validateJWT,
  hasRoles,
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors,
]

export const updateUserValidator = [
  validateJWT,
  param("uid", "No es un ID válido").isMongoId(),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
]

export const updateRolValidator = [
  validateJWT,
  isAdmin,
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("rol").notEmpty().withMessage("El rol es requerido"),
  validarCampos,
  handleErrors,
]
