var express = require("express");
var app = express();

//Routes
app.get("/", function(req, res){
  res.send("Hi there, welcome to my assigment!");
});

app.get("/speak/:animals", function(req, res){
  let sound = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof",
    cat: "Meow"
  };
  let animal = req.params.animals.toLowerCase();
  res.send("The "+ animal +" says '"+ sound[animal] +"'");
});

app.get("/repeat/:word/:times", function(req, res){
  let word = req.params.word;
  let t = parseInt(req.params.times);
  let result = "";
  for(let i=0; i<t; i++){
    result += word + " ";
  }
  res.send(result);
});

app.get("*", function(req, res){
  res.send("Error!!");
});

//Starts server
app.listen(3000, function(){
  console.log("Starting on port 3000");
});
