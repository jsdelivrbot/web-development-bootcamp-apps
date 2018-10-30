var express   = require("express"),
router        = express.Router({mergeParams: true}),
Campground    = require("../models/campground"),
Coment        = require("../models/comments");

//comments newCampground
router.get("/new", isLoggedIn ,function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: foundCampground});
    }
  });
});

//coments create
router.post("/", isLoggedIn, function(req, res){
  //lookup campground using id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      Coment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          res.redirect("/campgrounds/"+ campground._id);
        }
      });
    }
  });
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
