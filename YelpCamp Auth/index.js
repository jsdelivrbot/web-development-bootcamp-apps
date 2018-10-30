var express       = require("express"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Coment        = require("./models/comments"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    app           = express();


mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//Passport configuration
app.use(require("express-session")({
  secret: "Marvel is the best",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


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

app.get("/campgrounds/:id/comments/new", isLoggedIn ,function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: foundCampground});
    }
  });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//AUTH Routes
//AUTH //Show register form
app.get("/register", function(req, res){
  res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

//show login form
app.get("/login", function(req, res){
  res.render("login");
});
//handle login logic
app.post("/login",passport.authenticate("local",//middleware
{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}), function(req, res){

});

//logout Route
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}







app.listen(3000, function(){
  console.log("Starting Server");
});
