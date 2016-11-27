const User = require('../models/user').User;

module.exports = function (req, res, next) {
  User.findById(req.params.id, function (err, usuario) {
    if (usuario != null) {
      console.log("encontre al usuario "+ usuario.username);
      res.locals.usuario = usuario;
      next();
    }else {
      res.redirect("/admin/usuarios");
    }
  })
}
