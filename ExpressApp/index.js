var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", ejs);

app.get("/", function(req, res){
   res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
  let thing = req.params.thing;
  res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
  var post = [
    {title: "Post 1", author: "Suzy"},
    {title: "My Adorable pet bunny", author: "Charlie"},
    {title: "Can you believe", author: "Colt"}
  ];
  res.render("posts.", {posts: post});
});

app.listen(3000, function(){
  console.log("Starting Server");
});
