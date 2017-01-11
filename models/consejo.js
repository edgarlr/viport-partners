const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var consejo_schema = new Schema({
  title:{
    type:String,
    required:true
  },
  destino:{
    type:String,
    requider:true
  },
  description:{
    type:String,
    required:true
  }
});

var Consejo = mongoose.model("Consejo", consejo_schema)

module.exports = Consejo;
