const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const formidable = require('express-formidable');
const User = require('./models/user').User;
const cookieSession = require('cookie-session');
const async = require('async');
const routerApp = require("./routesApp");
const routerAdmin = require("./routesAdmin");
const session_middleware = require('./middlewares/session');
const admin_session = require('./middlewares/admin_session');
const methodOverride = require('method-override');

var app = express();

app.use(sassMiddleware({
    src: __dirname + '/sass',
    dest: path.join(__dirname, 'public/css'),
    indentedSyntax: true,
    debug: true,
    outputStyle: 'compressed',
    prefix: '/public/css'  // Where prefix is at <link rel="stylesheets" href="public/css/style.css"/>
}));
app.use("/public", express.static('public'));
app.use(formidable({keepExtensions: true}));
app.use(methodOverride("_method"));
app.use(cookieSession({
  name: "session",
  keys: ["llave-1", "llave-2"]
}));

app.set("view engine", "jade");

app.get("/", function (req, res) {
  if (req.session.user_id == null) {
    res.redirect("/home")
  }else {
    res.render("index")
});

app.post("/sessions", function (req, res) {
  User.findOne({username: req.fields.username, password: req.fields.password}, function (err, user) {
    if (!user || err) {
      res.redirect("/")
    }else {
      req.session.userAccess = user.acceso;
      req.session.user_id = user._id;
      res.redirect("/home")
    }
  })
});


app.use("/admin", admin_session, session_middleware);
app.use("/admin", routerAdmin);
app.use("/home", session_middleware)
app.use("/home", routerApp);

/*
app.use(function(req, res, next) {
  res.status(404).render('404');
  res.end();
});
*/

app.listen(8080);
