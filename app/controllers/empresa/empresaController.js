var axios = require('axios');
const fs = require('fs');

module.exports = {
    //insertar api banco
    insertarImagen: function (req, res) {
        var nombre = req.file.filename
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        
        var data = JSON.stringify({
            "imagene": {
              "nombre": nombre,
              "base64": encode_image
            }
          });
          
          var config = {
            method: 'post',
            url: 'https://apitest-bt.herokuapp.com/api/v1/imagenes?user=User123&password=Password123',
            headers: { 
              'user': 'User123', 
              'password': 'Password123', 
              'Content-Type': 'application/json'
            },
            data : data
          };

        axios(config).then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            var respuesta = {
                codigo: 200,
                mensaje: 'error en el envío de imagen a Banco'
            };

            return respuesta
        });
    },

    //obtener imagens banco
    imagenes: function(req, res) {
        var config = {
            method: 'get',
            url: 'https://apitest-bt.herokuapp.com/api/v1/imagenes',
            headers: { 
              'user': 'User123', 
              'password': 'Password123'
            }
          };
          
          axios(config)
          .then(function (response) {
            var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

            var jsonres = []; // new Array

            for (x of response.data) {
                if (base64regex.test(x.base64)){
                    jsonres.push(x); 
                }
            }
            
            return res.status(200).send(jsonres)
          })
          .catch(function (error) {
            var respuesta = {
                codigo: 200,
                mensaje: 'error en obtener imagenes'
            };
            return res.status(400).send(respuesta)
          });
    },

    //obtenre imagen banco
    imagen: function(req, res) {
        var id = req.params.id
        var config = {
            method: 'get',
            url: 'https://apitest-bt.herokuapp.com/api/v1/imagenes/'+id,
            headers: { 
              'user': 'User123', 
              'password': 'Password123'
            }
          };
          
          axios(config)
          .then(function (response) {
            return res.status(200).send(response.data)
          })
          .catch(function (error) {
            var respuesta = {
                codigo: 200,
                mensaje: 'No se pudo obtener la imagen con id '+id
            };
            return res.status(400).send(respuesta)
          });
    },

    //actualiza imagen banco
    actualizarImagen: function(req, res) {
        var axios = require('axios');
        var nombre = req.file.filename
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        var id = req.params.id

        var data = JSON.stringify({
          "id": id,
          "nombre": nombre,
          "base64": encode_image
        });
        
        var config = {
          method: 'put',
          url: 'https://apitest-bt.herokuapp.com/api/v1/imagenes/'+id,
          headers: { 
            'user': 'User123', 
            'password': 'Password123', 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          return res.status(200).send(JSON.stringify(response.data))
        })
        .catch(function (error) {
            var respuesta = {
                codigo: 200,
                mensaje: 'error en actualización de imagen a Banco'
            };
            return res.status(400).send(respuesta); 
        });
    },

    //eliminar imagen de banco
    eliminarImagen: function(req, res) {
        var id = req.params.id
        var config = {
            method: 'delete',
            url: 'https://apitest-bt.herokuapp.com/api/v1/imagenes/'+id,
            headers: { 
              'user': 'User123', 
              'password': 'Password123'
            }
          };
          
          axios(config)
          .then(function (response) {
            return res.status(200).send(response.data)
          })
          .catch(function (error) {
            var respuesta = {
                codigo: 200,
                mensaje: 'error al eliminar imagen con id '+id
            };
            return res.status(400).send(respuesta); 
          });
    }
}