const Destino = require('../models/destino');

module.exports = function (req, res, next) {
  Destino.find({}, function (err, destinos) {
    if (destinos != null) {
      res.locals.destinos = destinos;
      next();
    }else {
      res.redirect("/");
    }
  })
};
