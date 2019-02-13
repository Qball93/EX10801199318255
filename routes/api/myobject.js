var uuidv4 = require('uuid/v4');
var express = require('express')
var router = express.Router();


var fileModel = require('./jsonmodel');


var data = [];


var myobject = {
    RTN:'',
    Empresa:'',
    Correo:'',
    Rubro:'',
    Direccion:'',
    Telefono:''
};

router.get('/', function( req, res, next) {
    if(!data){
      fileModel.read(function(err, filedata){
        if(err){
          console.log(err);
          data = [];
          return res.status(500).json({'error':'Error al Obtener Datos'});
        }
        data = JSON.parse(filedata);
        return res.status(200).json(data);
      });
    } else {
      return res.status(200).json(data);
    }
});


    router.post('/nuevo', function(req, res, next){
    var _newObject = Object.assign({} , myobject, req.body);

    
    if(!data){
      data = [];
    }


    data.push(_newObject);
    fileModel.write(data, function(err){
      if(err){
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Obtener Data' });
      }
      return res.status(200).json(_newObject);
    });
  });


  router.put('/update/:RTN', function(req, res, next){
    var RTN = req.params.RTN;
    var _newParams = req.body;
    var _estadoUpd = null;
    var newData = data.map(
      function(doc, i){
        if (doc.RTN == RTN){
          _estadoUpd = Object.assign(
            {},
            doc,
            {"Correo":_newParams.Correo},
            {"Telefono":_newParams.Telefono},
            );
          return _estadoUpd;
        }
        return doc;
      }
    );// end map
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json(_estadoUpd);
    });
  });






  module.exports = router;