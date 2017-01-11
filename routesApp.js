const express = require('express');
const User = require('./models/user').User;
const Destino = require('./models/destino');
const Consejo = require('./models/consejo');
const destino_finder_middleware = require('./middlewares/find_destino');
const destinos_finder_middleware = require('./middlewares/find_destinos');

const router = express.Router();

/*Index*/
router.get("/", function (req, res) {
  res.render("app/home", { pageName: "Inicio" })
});

router.all("/tablero*", destinos_finder_middleware);

/*Tableros*/
router.get("/tablero", function (req, res) {
  res.render("app/tablero", {destinos: res.locals.destinos, pageName: "Tableros"});
});

/*Lugar*/
  //Nuevo
router.get("/tablero/nuevo-lugar", function (req, res) {
  res.render("app/destinos/nuevo/lugar", {destinos: res.locals.destinos, pageName: "Nuevo Lugar"});
});

router.get("/tablero/:lugar/editar", function (req, res) {
  res.render("app/destinos/editar/lugar")
})




  //Monumento, Parque, etc.
router.get("/tablero/nuevo-MPF", function (req, res) {
  res.render("app/destinos/nuevo/MPF", {destinos: res.locals.destinos, pageName: "Nuevo monumento, fuente, etc."});
})

  //Ruta
router.get("/tablero/nuevo-ruta", function (req, res) {
res.render("app/destinos/nuevo/ruta", {destinos: res.locals.destinos, pageName: "Nueva Ruta"});
})

  /*Consejo*/
//Nuevo
router.get("/tablero/nuevo-consejo", function (req, res) {
res.render("app/destinos/nuevo/consejo", {destinos: res.locals.destinos, pageName: "Nuevo Consejo"});
})

//Editar
router.get("/tablero/:consejo/editar", function (req, res) {
  res.render("app/destinos/edit/consejo", {pageName:"Editar Consejo"});
})

//Experiencia
router.get("/tablero/nuevo-experiencia", function (req, res) {
res.render("app/destinos/nuevo/experiencia", {destinos: res.locals.destinos, pageName: "Nueva Experiencia"});
})

//Sabias Qué
router.get("/tablero/nuevo-sabiasque", function (req, res) {
res.render("app/destinos/nuevo/sabiasque", {destinos: res.locals.destinos, pageName: "Nuevo Sabias Qué"});
})

router.all("/tablero/:destino*", destino_finder_middleware);

router.get("/tablero/:destino/:cont_clave/editar", function (req, res) {

});

router.route("tablero/:destino/:cont_clave")
  .get(function (req, res) {

  })
  .put(function (req, res) {

  })
  .delete(function (req, res) {

  });

router.route("/tablero/:destino")
  .get(function (req, res) {
    res.render("app/destinos/index", {pageName: res.locals.destino.nombre});
  })
  .post(function (req, res) {

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
