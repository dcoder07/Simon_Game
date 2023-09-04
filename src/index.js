//This is my code

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(()=>{
if(!started){  
  nextSequence();

  $("#level-title").text("Level - "+level);

  started = true;
}
});

$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level - "+ level);
  $(".level").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound (name){
  var audio = new Audio("./sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{
      $("#" + currentColour).removeClass("pressed");
    },100);
  }

  function checkAnswer (currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(()=>{
    nextSequence();
    },1000);
  }
}
else{
playSound("wrong");
$("body").addClass("game-over");
setTimeout(()=>{
$("body").removeClass("game-over"); 
},200); 
$("#level-title").text("Game Over, Press Any Key to Restart"); 
startOver(); 
}
  }

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}