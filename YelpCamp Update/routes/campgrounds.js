var express   = require("express"),
router        = express.Router(),
Campground    = require("../models/campground");


router.get("/", function(req, res){
  //get all campgrounds
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else{
        res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
    }
  });
});


router.post("/", isLoggedIn, function(req, res){
  //get data from form
  let name = req.body.name;
  let image = req.body.image;
  let desc =  req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author: author};
  Campground.create(newCampground,function(err, campground){
      if(err){
        console.log(err);
      }else{
        //redirect
        console.log(campground);
        res.redirect("/campgrounds");
      }
    }
  );
});

router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//SHOW- shows more info about one campground
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });

});

//Edit
router.get("/:id/edit",checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update
router.put("/:id",checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(err, updatedCampground){
      res.redirect("/campgrounds/"+ req.params.id);
  });
});

//Destroy
router.delete("/:id", checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
      res.redirect("/campgrounds");
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
  if(req.isAuthenticated()){//checks if the user is log in
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("back");
      }else{
        if(foundCampground.author.id.equals(req.user._id)){
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
