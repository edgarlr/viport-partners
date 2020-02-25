const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var lugar_schema = new Schema({
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
  tel:{
    type:[String]
  },
  website:{
    type:[String]
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
  info:{
    petfriendly:{type:Boolean},
    estacionamiento:{type:Boolean},
    souvenirs:{type:Boolean},
    paqueteria:{type:Boolean},
    banos:{type:Boolean},
    discapacitados:{type:Boolean},
    fumadores:{type:Boolean},
    touroguia:{type:Boolean},
    nochesdemuseos:{type:Boolean},
    wifi:{type:Boolean},
    parquimetro:{type:Boolean}
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

var Lugar = mongoose.model("Lugar", lugar_schema)

module.exports = Lugar;
