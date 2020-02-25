const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var consejo_lugar_schema = new Schema({
  title:{
    type:String,
    required:true
  },
  atractivo:{
    type:String,
    required:true
  }
});

let Consejo_lugar = mongoose.model("Consejo_lugar", consejo_lugar_schema)

module.exports = Consejo_lugar;
