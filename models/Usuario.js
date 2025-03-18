const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre genero requerido']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum:['Administrador','Docente']
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = model('Usuario', UsuarioSchema)