import { Router } from "express";
import { getClienteById, getClientes, deleteCliente, updatePassword, updateCliente, updateRol } from "./cliente.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateRolValidator, getClientesValidator } from "../middlewares/user-validators.js";

/**
 * @swagger
 * /supermercado/v1/cliente/findCliente/{uid}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     responses:
 *       200:
 *         description: The client description by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/cliente:
 *   get:
 *     summary: Get all clients
 *     tags: [Cliente]
 *     responses:
 *       200:
 *         description: The list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 clientes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/cliente/deleteCliente/{uid}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     responses:
 *       200:
 *         description: The client was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/cliente/updatePassword/{uid}:
 *   patch:
 *     summary: Update a client's password
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: The password was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/cliente/updateCliente/{uid}:
 *   put:
 *     summary: Update a client
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               email:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: The client was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 cliente:
 *                   $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /supermercado/v1/cliente/updateRol/{uid}:
 *   patch:
 *     summary: Update a client's role
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role
 *     responses:
 *       200:
 *         description: The role was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 updatedRol:
 *                   $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Server error
 */

const router = Router();

router.get("/findCliente/:uid", getUserByIdValidator, getClienteById);

router.get("/",getClientesValidator, getClientes );

router.delete("/deleteCliente/:uid", deleteUserValidator, deleteCliente);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.put("/updateCliente/:uid", updateUserValidator, updateCliente);

router.patch("/updateRol/:uid", updateRolValidator, updateRol);

export default router;