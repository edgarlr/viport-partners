const Experiencia = require('../../models/atractivos/experiencia');

module.exports = function (req, res, next) {
  Experiencia.findById(req.params.experiencia)
        .populate("destino")
        .populate("creator")
        .exec(function (err, experiencia) {
          if (experiencia != null) {
            res.locals.experiencia = experiencia;
            next();
          }else {
            res.redirect("/home/tablero");
          }
        });
};
