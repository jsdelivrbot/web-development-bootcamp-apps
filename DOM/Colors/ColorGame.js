var diff = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var modeBtn =  document.querySelectorAll(".mode");
var messageDisplay = document.querySelector("#message");
var h1 =  document.querySelector("h1");
var rstButton =  document.querySelector("#reset");
var colorDisplay = document.getElementById("colorDisplay");

//init function
init();

//reset button event
rstButton.addEventListener("click", reset);

//Functions
function init(){
  setModeBtn();
  setSquares();
  reset();
}

//Sets difficulty buttons
function setModeBtn() {
  for(var i=0; i < modeBtn.length; i++){
    modeBtn[i].addEventListener("click", function(){
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy"? diff = 3: diff = 6;
      reset();
    });
  }
}

//Sets square events
function setSquares(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        rstButton.textContent="Play Again?";
      } else {
        messageDisplay.textContent = "Try Again!";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

//Resets every variable;
function reset(){
  colors = generateRndColors(diff);
  pickedColor =  colors[pickColor()];
  colorDisplay.textContent = pickedColor;
  rstButton.textContent = "New Colors";
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  for(var i = 0; i < squares.length; i++) {
    if(colors[i]){
      squares[i].display = "block";
      squares[i].style.backgroundColor = colors[i];
    }else{
      squares[i].display = "none";
    }
  }
}

//Changes thes color of the square so it matches the background
function changeColors(color){
  for(var i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

//picks a number for the array to choose a color
function  pickColor(){
  var rnd = parseInt(Math.random() * colors.length);
  return rnd;
}

//generates random rgb colors for the squares
function generateRndColors(num){
  var arr = [];
  for(var i=0; i<num; i++){
    var rgb = [parseInt(Math.random() * 256), parseInt(Math.random() * 256), parseInt(Math.random() * 256)];
    var rgbString = "rgb("+ rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
    arr.push(rgbString);
  }
  return arr;
}
