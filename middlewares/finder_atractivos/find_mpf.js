const Mpf = require('../../models/atractivos/mpf');

module.exports = function (req, res, next) {
  Mpf.findById(req.params.atractivo)
        .populate("destino")
        .populate("creator")
        .exec(function (err, mpf) {
          if (mpf != null) {
            res.locals.mpf = mpf;
            next();
          }else {
            res.redirect("/home/tablero");
          }
        });
};
