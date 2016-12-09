const Destino = require('../models/destino');

module.exports = function (req, res, next) {
  Destino.findOne({clave: req.params.destino}, function (err, destino) {
    if (destino != null) {
      res.locals.destino = destino;
      next();
    }else {
      res.redirect("tablero");
    }
  })
}
