const express = require('express');
const routerAtractivos = require("./routesAtractivos");
const User = require('./models/user').User;
const async = require('async');
const Destino = require('./models/destino');
//Atractivos
const Consejo = require('./models/atractivos/consejo');
const Sabiasque = require('./models/atractivos/sabiasque');
const Experiencia = require('./models/atractivos/experiencia');
const Lugar = require('./models/atractivos/lugar');
const Mpf = require('./models/atractivos/mpf');
//Middlewares
const destino_finder_middleware = require('./middlewares/find_destino');
const destinos_finder_middleware = require('./middlewares/find_destinos');

const router = express.Router();

/*Index*/
router.get("/", function (req, res) {
  res.render("app/home", { pageName: "Inicio" })
});

  //middleware
router.all("/tablero*", destinos_finder_middleware);

/*Tableros*/
router.get("/tablero", function (req, res) {
  res.render("app/tablero", {destinos: res.locals.destinos, pageName: "Tableros"});
});

/*Destinos*/
  //middleware
router.all("/tablero/:destino*", destino_finder_middleware);

  //Finder for each destino
router.get("/tablero/:destino", function (req, res) {
  async.parallel({
    Consejo: function(cb){
      Consejo.find({destino: res.locals.destino._id})
            .populate("creator")
            .populate("destino")
            .exec(cb);
    },
    Experiencia: function(cb){
      Experiencia.find({destino: res.locals.destino._id})
              .populate("creator")
              .populate("destino")
              .exec(cb);
    },
    Sabiasque: function(cb){
      Sabiasque.find({destino: res.locals.destino._id})
              .populate("creator")
              .populate("destino")
              .exec(cb);
    },
    Lugar: function(cb){
      Lugar.find({destino: res.locals.destino._id})
              .populate("creator")
              .populate("destino")
              .exec(cb);
    },
    Mpf: function(cb){
      Mpf.find({destino: res.locals.destino._id})
              .populate("creator")
              .populate("destino")
              .exec(cb);
    }
  }, function(err, results){
    res.render("app/destinos/index", {pageName: res.locals.destino.nombre, results: results })
  });
});

//

//REST opciones
router.route("/opciones")
  .get(function (req, res) {
    User.findById(req.session.user_id ,function (err, usuario) {
      if(err){ res.redirect("/home"); return; }
      res.render("app/opciones", {pageName: "Opciones", usuario: usuario })
    });
  })
  .put(function (req, res) {
    User.findById(req.session.user_id, function (err, usuario) {
      if(err){ res.redirect("/opciones"); return; }
      User.findOneAndUpdate(
        {
          nombre: usuario.nombre,
          apellido: usuario.apellido
        },
        {
          nombre: req.fields.name,
          apellido: req.fields.apellido
        },
        { runValidators: true, context: 'query' },
        function(err) {
          if (err) {
            console.log(err);
          }
          res.redirect("opciones");
        }
      )
    });
  });

router.get("/cerrar-sesion", function (req, res) {
  req.session = null
  res.redirect("/")
});

router.use("/atractivos", destinos_finder_middleware);
router.use("/atractivos", routerAtractivos);

module.exports = router;
