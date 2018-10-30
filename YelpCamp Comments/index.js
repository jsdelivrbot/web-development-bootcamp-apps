var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose =  require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Coment = require("./models/comments");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// mongoose.Promise = global.Promise;

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
  //get all campgrounds
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else{
        res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

app.post("/campgrounds", function(req, res){
  //get data from form
  let name = req.body.name;
  let image = req.body.image;
  let desc =  req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground,
    function(err, campground){
      if(err){
        console.log(err);
      }else{
        //redirect
        res.redirect("/campgrounds");
      }
    }
  );
});

app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new");
});

//SHOW- shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });

});

//Comments Routes

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: foundCampground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res){
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
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+ campground._id);
        }
      });
    }
  });
  //create new comment
  //connect new comment to campground
  //redirect to show page
});

app.listen(3000, function(){
  console.log("Starting Server");
});
