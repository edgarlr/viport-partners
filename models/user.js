const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/vPartners");

var acceso = ["Administrador", "Editor"];
var email_match = [/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email válido"];

var password_validation = {
  validator: function (p) {
    return this.password_confirmation == p;
  },
  message: "Las Contraseñas no coinciden"
};

var user_schema = new Schema({
  nombre: {
    type:String,
    required: "El nombre es obligatorio"
  },
  apellido: {
    type:String,
    required: "El apellido es obligatorio"
  },
  username: {
    type:String,
    required: true,
    minlength: [5, "Se necesitan al menos 5 caracteres"],
    unique: true,
    maxlength: [25, "El máximo es de 25 caracteres"]
  },
  password: {
    type:String,
    required: true,
    minlength: [8, "Se necesitan al menos 8 caracteres"],
    validate: password_validation,
    maxlength: [35, "El máximo es de 35 caracteres"]
  },
  email: {
    type:String,
    required: true,
    match: email_match,
    unique: true
  },
  acceso: {
    type:String,
    required: true,
    enum: {values: acceso, message: "Opción no valida"}
    }
});

user_schema.plugin(uniqueValidator)

user_schema.virtual("password_confirmation").get(function () {
  return this.p_c;
}).set(function(password) {
  this.p_c = password;
})

var User = mongoose.model("User", user_schema)

module.exports.User = User;
