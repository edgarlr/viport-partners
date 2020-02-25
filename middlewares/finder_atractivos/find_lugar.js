const Lugar = require('../../models/atractivos/lugar');

module.exports = function (req, res, next) {
  Lugar.findById(req.params.lugar)
        .populate("destino")
        .populate("creator")
        .exec(function (err, lugar) {
          if (lugar != null) {
            res.locals.lugar = lugar;
            next();
          }else {
            res.redirect("/home/tablero");
          }
        });
};
