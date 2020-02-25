const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sabiasque_schema = new Schema({
  type:{
    type:String,
    required:true
  },
  library:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  destino:{
    type:Schema.Types.ObjectId,
    ref:"Destino"
  },
  description:{
    type:String,
    required:true
  },
  creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
}, {
  timestamps:{
    createdAt:"created_at"
  }
});

var Sabiasque = mongoose.model("Sabiasque", sabiasque_schema)

module.exports = Sabiasque;
