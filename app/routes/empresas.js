var router = require('express').Router()
const multer = require('multer')
var imagenes = require('../controllers/empresa/empresaController')
const fs = require('fs');
const { groupEnd } = require('console');
const { imagen } = require('../controllers/empresa/empresaController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
   
var upload = multer({ storage: storage })

  //ruta obtener todas las imagenes
  router.get('/', function(req, res) {
    return  imagenes.imagenes(req, res)
  })
  
  //ruta obtener una imagen
  router.get('/:id', function(req, res) {
    return imagenes.imagen(req, res);
  })

  //ruta subir imagen
  router.post('/', upload.single('attachment'), function(req, res) {
    if (req.file.length == 0) {        
        respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Ingrese una imagen'
        };
        res.status(400).send(responseb);
    } else {
        if (req.file.mimetype.indexOf('image') >= 0) {
            
            let r = imagenes.insertarImagen(req, res)
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            respuesta = {
                error: true,
                codigo: 400,
                mensaje: encode_image
            };
            res.status(200).send(respuesta);       
        } else {            
            respuesta = {
                error: true,
                codigo: 400,
                mensaje: 'Ingrese una imagen'
            };
            res.status(400).send(responseb);
        }
    }
  })

  //ruta actualizar
  router.put('/:id', upload.single('attachment'), function(req, res) {
    if (req.file.length == 0) {        
        respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Ingrese una imagen'
        };
        res.status(400).send(responseb);
    } else {
        if (req.file.mimetype.indexOf('image') >= 0) {
            
            /*let r = imagenes.insertarImagen(req, res)
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            respuesta = {
                error: true,
                codigo: 400,
                mensaje: encode_image
            };
            res.status(200).send(respuesta);*/
            
            return imagenes.actualizarImagen(req, res);
        } else {            
            respuesta = {
                error: true,
                codigo: 400,
                mensaje: 'Ingrese una imagen'
            };
            res.status(400).send(responseb);
        }
    }
    
  })

  //ruta eliminar imagen
  router.delete('/:id', function(req, res) {
    return imagenes.eliminarImagen(req, res)
  })
  module.exports = router