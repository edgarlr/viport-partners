const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var experiencia_schema = new Schema({
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
  adress:{
    type:String
  },
  horario:{
    lunes:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    martes:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    miercoles:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    jueves:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    viernes:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    sabado:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    },
    domingo:{
      apertura:{ type:String },
      cierre:{ type:String },
      precio:{ type:String }
    }
  },
  precio:{
    menores:{ type:String },
    inapam:{ type:String },
    discapacitados:{ type:String },
    pensionados:{ type:String },
    estudiantes:{ type:String }
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

var Experiencia = mongoose.model("Experiencia", experiencia_schema)

module.exports = Experiencia;
