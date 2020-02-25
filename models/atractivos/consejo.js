const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var consejo_schema = new Schema({
  type:{
    type:String,
    required: true
  },
  library:{
    type:String,
    required: true
  },
  title:{
    type:String,
    required:true
  },
  destino:{
    type:Schema.Types.ObjectId,
    ref:"Destino"
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

var Consejo = mongoose.model("Consejo", consejo_schema)

module.exports = Consejo;
