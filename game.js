
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// --------- wait for keypress to start the game -----------
$(document).keydown(function() {
  if (started === false) {
    started = true;
    nextSequence(); // play the next box
  }
});

// --------- user clicks button --------------------
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  // sound and animation
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // store the user choice
  userClickedPattern.push(userChosenColour);

  // check if user input is correct
  checkAnswer(userClickedPattern.length - 1);
});

// --------- update the game --------------------
function nextSequence() {
  // reset user input
  userClickedPattern = [];

  // update level
  $("#level-title").text("Level " + level);
  level++;

  // generate the next box to click
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // store the game pattern
  gamePattern.push(randomChosenColour);

  // animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}


function checkAnswer(currentLevel) {

  // user's most recent (last) choice = game pattern?
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    console.log(currentLevel);
    console.log(level);
    if (currentLevel === (level-1)) {
      // full sequence pressed, call next sequence
      setTimeout(nextSequence, 1000);
    }
  } else if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver() {
  // reset values
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
