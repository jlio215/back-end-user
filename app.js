const express = require('express')
const { mongoConn } = require('./db/connect-mongo')
const dotenv = require('dotenv').config()
const cors = require('cors')

mongoConn()

const app = express()

app.use(express.json())

app.use(cors({
  origin: '*'
}))

const usuario = require('./routes/Usuario.js')
const estadoEquipo = require('./routes/estadoEquipo.js')
const inventario = require('./routes/inventario.js')
const tipoEquipo = require('./routes/tipoEquipo.js')
const marca = require('./routes/marca.js')
const auth = require('./routes/auth.js')

app.use('/usuarios', usuario)
app.use('/auth', auth)
app.use('/estadoEquipos', estadoEquipo)
app.use('/inventarios', inventario)
app.use('/tipoEquipos', tipoEquipo)
app.use('/marcas', marca)

module.exports = app