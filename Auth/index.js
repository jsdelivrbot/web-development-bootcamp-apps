var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(require("express-session")({
  secret: "Mario World",
  resave: false,
  saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//ROUTES
app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});

//AUTH routes

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
  });
});

//login ROUTES

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res){
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});








app.listen(3000, function(){
  console.log("Server Started");
});
