const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var destino_schema = new Schema({
  nombre:{
    type:String,
    required:true
  },
  descripcion:{
    type:String
  },
  clave:{
    type:String,
    required:true,
    unique:true
  }
});

var Destino = mongoose.model("Destino", destino_schema)

module.exports = Destino;
