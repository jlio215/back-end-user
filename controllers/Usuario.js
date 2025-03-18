const Usuario = require('../models/Usuario')
const { request, response } = require('express')
const bycript = require ('bcryptjs')

/**
 * Crear usuario
 */
const createUsuario = async (req = request, res = response) => {// endpoint
    //console.log(req.body)

        
    try {
        const usuario = new Usuario(req.body)

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;
        const usuarioDB = await Usuario.findOne({ email:req.body.email })

        if(usuarioDB) {
            return res.status(400).json({mjs: 'Ya existe email'})
        }// select * from usuario where email = ?
    
        await usuario.save()
        return res.status(201).json(usuario)

    } catch(error) {
        console.log(error)
        return res.status(500).json({msj: error})
    }
}
const getUsuarios = async (req = request, 
    res = response) => {
        try{
            const {  } = req.query
            const usuarioDB = await Usuario.find()
            console.log(usuarioDB)
            return res.json(usuarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general' + e
            })
        }
}

const getUsuario = async (req = request, 
    res = response) => {
        try{
            const data = req.body
            const id = req.params.id
            const usuarioDB = await Usuario.findById(id)
            return res.json(usuarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general' + e
            })
        }
}

//TODO
const updateUsuarioByID = async (req = request,
    res = response) => {
    try{
        const usuario = new Usuario(req.body);
        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;
        const id = req.params.id
        const data = req.body;
        data.fechaActualizacion = new Date()
        const obj = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(obj)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}
const deleteUsuario = async (req = request, 
    res = response) => {
        try{
            const id = req.params.id
            const usuarioDB = await Usuario.deleteOne({_id: id})//select * from tipo where estado=?
            return res.json(usuarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

module.exports = { 
    createUsuario, 
    getUsuarios,
    getUsuario, 
    updateUsuarioByID,
    deleteUsuario
}