var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose =  require("mongoose"),
    port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// mongoose.Promise = global.Promise;

// Campground.create({
//   name: "Granite Hill",
//   image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
//   description: "This is a huge granite Hill. no bathrooms. No water. Beautiful granite"
// },
//   function(err, campground){
//     if(err){
//       console.log(err);
//     }else{
//       //redirect
//       console.log(campground);
//     }
//   });


app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
  //get all campgrounds
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else{
        res.render("campgrounds", {campgrounds: allCampgrounds});
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
  res.render("new");
});

//SHOW- shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: foundCampground});
    }
  });

});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
