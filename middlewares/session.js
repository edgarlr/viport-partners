const User = require('../models/user').User;

module.exports = function (req, res, next) {
  if(!req.session.user_id){
    console.log(req.session);
    res.redirect("/");
  }
  else {
    User.findById(req.session.user_id, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
      else {
        res.locals = { user: user };
        next();
      }
    });
  }
};
