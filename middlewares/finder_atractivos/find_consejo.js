const Consejo = require('../../models/atractivos/consejo');

module.exports = function (req, res, next) {
  Consejo.findById(req.params.consejo)
        .populate("destino")
        .populate("creator")
        .exec(function (err, consejo) {
          if (consejo != null) {
            res.locals.consejo = consejo;
            next();
          }else {
            res.redirect("/home/tablero");
          }
        });
};
