var p1Button =  document.querySelector("#p1");
var p2Button =  document.querySelector("#p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var reset = document.querySelector("#reset");
var input = document.querySelector("input");
var winningScoreDisplay = document.querySelector("#winning");

var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 0;

p1Button.addEventListener("click", function(){
  if(!gameOver){
    p1Display.textContent = ++p1Score;
  }
  if (p1Score === winningScore){
    gameOver = true;
    p1Display.style.color="green";
  }
});

p2Button.addEventListener("click", function(){
  if(!gameOver){
    p2Display.textContent = ++p2Score;
  }
  if (p2Score === winningScore){
    gameOver = true;
    p2Display.style.color="green";
  }
});

reset.addEventListener("click", rst);

function rst(){
  gameOver=false;
  p1Score=0;
  p2Score=0;
  p1Display.textContent=0;
  p2Display.textContent=0;
  p1Display.style.color="black";
  p2Display.style.color="black";
}

input.addEventListener("change", function(){
  winningScore = parseInt(input.value);
  winningScoreDisplay.textContent = winningScore;
  rst();
});
