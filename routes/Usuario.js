const { Router } = require('express');
const {
    createUsuario,
    getUsuarios,
    getUsuario,
    updateUsuarioByID,
    deleteUsuario,
    buscarUsuariosPorCiudad
} = require('../controllers/Usuario.js');
const { validateRolAdmin } = require('../middleware/validate-rol-admin.js');
const { validateJWT } = require('../middleware/validate-jwt.js');

const router = Router();

/**
 * Crear Usuario
 */
router.post('/', validateJWT, validateRolAdmin, createUsuario);

/**
 * Consultar todos los Usuarios
 */
router.get('/', validateJWT, validateRolAdmin, getUsuarios);

/**
 * Consultar un Usuario por su ID
 */
router.get('/:id', validateJWT, validateRolAdmin, getUsuario);

/**
 * Actualizar Usuario
 */
router.put('/:id', validateJWT, validateRolAdmin, updateUsuarioByID);

/**
 * Borrar un Usuario
 */
router.delete('/:id', validateJWT, validateRolAdmin, deleteUsuario);

/**
 * Buscar Usuarios por ciudad
 */
router.get('/buscar', validateJWT, validateRolAdmin, buscarUsuariosPorCiudad);

module.exports = router;
