const express = require('express');
const User = require('./models/user').User;
const Destino = require('./models/destino');
const destino_finder_middelware = require('./middlewares/find_destino');

const router = express.Router();

/*Index*/
router.get("/", function (req, res) {
  res.render("app/home", { pageName: "Inicio" })
});

/*Tableros*/
router.get("/tablero", function (req, res) {
  Destino.find({}, function (err, destinos) {
    if (err) { res.redirect("/home"); return; }
    res.render("app/tablero", {destinos: destinos, pageName: "Tableros"});
  })
});

router.all("/tablero/:destino*", destino_finder_middelware);

router.get("/tablero/:destino", function (req, res) {
    res.render("app/destinos/index", {pageName: res.locals.destino.nombre});
});

/*Publicado*/
router.get("/publicado", function (req, res) {
  res.render("app/publicado", { pageName: "Publicado" })
});

router.get("/borradores", function (req, res) {
  res.render("app/borradores", { pageName: "Borradores" })
});

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

module.exports = router;
