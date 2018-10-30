var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Coment = require("./models/comments");

var data = [
  {
    name: "Cloud's Rest",
    image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert",
    image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Cannon Floor",
    image: "http://rv-camping.org/wp-content/uploads/2015/06/USACECampground.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        }else{
          console.log("added a campground");
          //crete comment
          Coment.create(
                        {
                          text: "this place is great",
                          author: "Homer"
                        }, function(err, comment){
                          if(err){
                            console.log(err);
                          }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment");
                          }
                        });

        }
      });
    });
  });
}


module.exports = seedDB;
