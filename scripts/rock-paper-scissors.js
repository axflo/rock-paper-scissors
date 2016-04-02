
//declares score variables and round flag for the game
var plscore = 0;
var axscore = 0;
var round = 0;

//displays the rules and sets
function setup(){
    var username = document.getElementById("uname").value;
    dataLayer.push({
        'event' : 'usernameSet',
        'username' : username
    });
    alert('First in 3 points wins. Good Luck!');
    scoreupdate();
    return shortgame();
}

//this gives a result winner and loser from one round of rps
function compare(choix1, choix2){
    var result;
    if (choix1 === choix2){
        result = "it's a draw!";
    }
    else if (choix1 === "rock"){
        if (choix2 === "scissors"){
            plscore++;
            result = "rock wins !";
        }
        else {
            axscore++;
            result = "paper wins !";
        }
    }
    else if (choix1 === "paper"){
        if (choix2 === "rock"){
            plscore++;
            result = "paper wins";
        }
        else {
            axscore++;
            result = "scissors wins";
        }
    }
    else if (choix1 === "scissors"){
        if (choix2 === "paper"){
            plscore++;
            result = "scissors wins";
        }
        else {
            axscore++;
            result = "rock wins";
        }
    }
    return alert(result);
}

// this runs the gameplay for one round of rps, pushes result to dL and executes scoreupdate()
function gameround(itemClicked){
    var choixUser = itemClicked;
    var choixAx = Math.random();
    if (choixAx < 0.34) {
    choixAx = "rock";
    } else if(choixAx <= 0.67) {
    choixAx = "paper";
    } else {
    choixAx = "scissors";
    }
    //call compare
    compare(choixUser, choixAx);

    //push choixAx to the UI
    document.getElementById("axplayed").innerHTML = choixAx;
    round++;
    dataLayer.push({
        'event':'round ' + round,
        'choixAx': choixAx,
        'choixUser': choixUser
    });
    return setTimeout(scoreupdate(), 4000);
}

// this gives the scoreupdate on the UI
function scoreupdate () {
    document.getElementById("axscore").innerHTML = axscore;
    document.getElementById("plscore").innerHTML = plscore;
    if(axscore > 2 || plscore > 2){
        endGame();
    }
}

function playround(){
    gameround(this.id);
}

//this launches a game in 3 rounds and send the final score to dL
function shortgame(){
    var items = document.getElementsByClassName('choice');
    for (var i=0;i<items.length;i++){
        items[i].addEventListener("click", playround);
    }
}



function endGame(){
    // remove click listeners from items
    var items = document.getElementsByClassName('choice');
    for (var i=0;i<items.length;i++){
        items[i].removeEventListener("click", playround);
    }
    //push end of the game event to datalayer
    dataLayer.push({
        'event':'shortgameEnded',
        'playerScore': plscore,
        'axelScore': axscore
    });
    //gives the final result
    if (plscore > axscore){
        alert("You win, well done!");
    }
    else {
        alert("You lose, try again?");
    }
    //reset flags to allow other games
    plscore = 0;
    axscore = 0;
    round = 0;
    return console.log('fin du jeu, rejouez?');
}

function disapear(){
    var part = document.getElementById("username");
    return part.style.display = 'none';
}
