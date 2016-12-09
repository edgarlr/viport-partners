const User = require('../models/user').User;

module.exports = function (req, res, next) {
  User.findById(req.params.id, function (err, usuario) {
    if (usuario != null) {
      res.locals.usuario = usuario;
      next();
    }else {
      res.redirect("/admin/usuarios");
      console.log("no hay usuario");
    }
  })
}
