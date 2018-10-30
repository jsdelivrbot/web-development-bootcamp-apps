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

//edit comments
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
  Coment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      console.log(err);
      res.redirect("back");
    }else{
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }

  });

});

//Update
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    Coment.findByIdAndUpdate( req.params.comment_id,  req.body.comment, function(err, updatedComment){
      if(err){
        res.redirect("back");
      }else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    });
});

//Delete comment
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Coment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
  if(req.isAuthenticated()){//checks if the user is log in
    Coment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      }else{
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          res.redirect("back");
        }
      }
      });
  }else{
    res.redirect("back");
  }
}

module.exports = router;
