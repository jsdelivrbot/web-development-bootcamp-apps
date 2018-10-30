var mongoose = require("mongoose");
var Semester = require("./models/semester");
var Course = require("./models/course");
var Metric = require("./models/metric");

var data = [
  {
    name: "Semestre 2"
  },
  {
    name: "Semestre 2"
  },
  {
    name: "Semestre 2"
  }
];

function seedDB(){
  //remove all campgrounds
  Semester.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed semesters");
    //add a few campgrounds
    data.forEach(function(seed){
      Semester.create(seed, function(err, semester){
        if(err){
          console.log(err);
        }else{
          console.log("added a Course");
          //crete comment
          Course.create(
                        {
                          name: "Sistemas Operativos",
                        }, function(err, course){
                          if(err){
                            console.log(err);
                          }else{
                            Metric.create(
                                          {
                                            name: "Examen 1",
                                          }, function(err, metric){
                                            if(err){
                                              console.log(err);
                                            }else{
                                              semester.course.metric.push(metric);
                                              course.save();
                                              console.log("Created a new metric");
                                            }
                                          });
                            semester.courses.push(course);
                            semester.save();
                            console.log("Created a new course");
                          }
                        });

        }
      });
    });
  });
}


module.exports = seedDB;
