const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mpf_schema = new Schema({
  type:{
    type:String,
    required:true
  },
  library:{
    type:String,
    required:true,
    lowercase:true
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
  category:{
    type:String
  },
  adress:{
    type:String
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

var Mpf = mongoose.model("Mpf", mpf_schema)

module.exports = Mpf;
