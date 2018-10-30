var express   = require("express"),
router        = express.Router(),
Campground    = require("../models/campground"),
Coment        = require("../models/comments"),
passport      = require("passport"),
User          = require("../models/user");


router.get("/", function(req, res){
   res.render("landing");
});

router.get("/register", function(req, res){
  res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("error", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login", function(req, res){
  res.render("login", {message: req.flash("error")});
});

//handle login logic
router.post("/login",passport.authenticate("local",//middleware
{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}), function(req, res){

});

//logout Route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;
