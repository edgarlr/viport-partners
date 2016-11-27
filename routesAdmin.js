const express = require('express');
const User = require('./models/user').User;
const routerAdmin = express.Router();
const user_finder_middleware = require('./middlewares/find_user');

routerAdmin.get("/", function (req, res) {
  res.render("admin/home", {pageName: "Consola de Administrador"})
})

/*REST*/

routerAdmin.get("/usuarios/nuevo", function (req, res) {
  res.render("admin/usuarios/nuevo", {pageName: "Nuevo Usuario"})
});

routerAdmin.all("/usuarios/:id*", user_finder_middleware);

routerAdmin.get("/usuarios/:id/editar", function (req, res) {
  res.render("admin/usuarios/editar", {pageName: "Editar Usuario"})
});

routerAdmin.route("/usuarios/:id")
  .put(function (req, res) {
    User.findOneAndUpdate(
      {
        nombre: res.locals.usuario.nombre,
        apellido: res.locals.usuario.apellido,
        email: res.locals.usuario.email,
        username: res.locals.usuario.username,
        acceso: res.locals.usuario.acceso
      },
      {
        nombre: req.fields.name,
        apellido: req.fields.apellido,
        email: req.fields.email,
        username: req.fields.username,
        acceso: req.fields.access
      },
      { runValidators: true, context: 'query' },
      function(err) {
        if (err) {
          console.log(err);
        }
        res.redirect(req.params.id+"/editar");
      }
    )
  })

  .delete(function (req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err) {
      if (!err) {
        res.redirect("/admin/usuarios")
      }else {
        res.redirect("/admin/usuarios/"+req.params.id+"/editar")
      }
    });
  });

routerAdmin.route("/usuarios")
  .get(function (req, res) {
    User.find({},function (err, usuarios) {
      if(err){ res.redirect("/admin"); return; }
      res.render("admin/usuarios/index", {usuarios: usuarios, pageName: "Usuarios"})
    });
  })
  .post(function (req, res) {
    let data = {
      nombre: req.fields.name,
      apellido: req.fields.apellido,
      username: req.fields.username,
      password: req.fields.password,
      password_confirmation: req.fields.password_confirmation,
      email: req.fields.email,
      acceso: req.fields.access
    };

    var user = new User(data);

    user.save().then(function (us) {
      res.send("Guardamos el usuario exitosamente");
    }, function (err) {
      if (err) {
        console.log(String(err));
        res.send("Hubo un error al intenar guardar el usuario")
      }
    });
  });


module.exports = routerAdmin;
