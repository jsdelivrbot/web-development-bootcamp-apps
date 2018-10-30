var middlewareObj = {},
Campground    = require("../models/campground"),
Coment        = require("../models/comments");

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
};

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){//checks if the user is log in
    Coment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        req.flash("error", "Campground not found");
        res.redirect("back");
      }else{
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
      });
  }else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){//checks if the user is log in
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Campground not found");
        res.redirect("back");
      }else{
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
      });
  }else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
};

module.exports = middlewareObj;
