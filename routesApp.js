const express = require('express');
const User = require('./models/user').User;

const router = express.Router();

router.get("/", function (req, res) {
  res.render("app/home", { pageName: "Inicio" })
});

router.get("/tablero", function (req, res) {
  res.render("app/tablero", { pageName: "Tablero" })
});

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
      console.log(usuario);
      if(err){ res.redirect("/usuarios"); return; }
      res.render("app/opciones", {pageName: "Opciones", usuario: usuario })
    });
  })
  .put(function (req, res) {
    User.findById(req.session.user_id ,function (err, usuario) {
      if(err){ res.redirect("/usuarios"); return; }
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


/*REST*/

router.get("/atractivos/nuevo", function (req, res) {

});

router.get("/atractivos/:id/editar", function (req, res) {

});

router.route("/atractivos/:id")
  .get(function (req, res) {

  })
  .put(function (req, res) {

  })
  .delete(function (req, res) {

  });

router.route("/destinos")
  .get(function (req, res) {

  })
  .post(function (req, res) {

  })
  .put(function (req, res) {

  })
  .delete(function (req, res) {

  });

module.exports = router;
