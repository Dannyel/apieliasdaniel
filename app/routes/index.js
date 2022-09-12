var router = require('express').Router()
var empresas = require('./empresas')

router.use('/empresas', empresas)

router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router