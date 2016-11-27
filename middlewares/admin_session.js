module.exports = function (req, res, next) {
  if(req.session.userAccess != "Administrador"){
    res.redirect("/home");
  }
  else {
    next();
  }
};
