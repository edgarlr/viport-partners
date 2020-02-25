const Sabiasque = require('../../models/atractivos/sabiasque');

module.exports = function (req, res, next) {
  Sabiasque.findById(req.params.sabiasque)
          .populate("creator")
          .populate("destino")
          .exec(function (err, sabiasque) {
            if (sabiasque != null) {
              res.locals.sabiasque = sabiasque;
              next();
            }else {
              res.redirect("/home/tablero");
            }
          });
};
