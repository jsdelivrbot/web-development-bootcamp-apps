var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// mongoose.Promise = global.Promise;

var campgrounds = [
  {name: "Salmon Creek", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Granite Hill", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"},
  {name: "Mountain Goat´s Rest", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"}
];

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  //get data from form
  let name = req.body.name;
  let image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  //redirect
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
