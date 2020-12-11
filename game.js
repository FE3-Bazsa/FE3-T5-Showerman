const underlineOfRiddle = document.getElementById("riddle");
const chosenLetter = document.getElementById("letters");
const letterBtn = document.querySelectorAll("#letters button");
const hangmanImg = document.querySelector("#image img");
const header = document.querySelector("h1");
const correct = document.querySelector("small");
const newGame = document.querySelector(".new-game-btn");
const livesText = document.querySelector("h3 span");

let currentLetter, actualTask, letterDivs, winningLength, renderDiv, live;
let qwerty = "qwertyuiopasdfghjklzxcvbnm";

let riddle = ["buffalo", "change", "winter", "energy", "money", "strange", "happiness", "mistake", "jump", "muscle", "enormous", "smart", "people", "world", "peace", "cherry", "snowman", "blackberry", "sunflower", "celebrate", "clock", "paint", "calculator", "gift", "turkey", "sunshine", "apple", "reindeer", "cookie", "christmas", "gepard", "orange", "white", "muscle", "witch", "brown", "wizard", "destiny", "cinema", "image"];


function riddleChooser() {
    actualTask = Math.floor(Math.random()*riddle.length);
    actualTask = riddle[actualTask];
};

function buttonDisable(str) {
    str = str.toUpperCase();
    Array.from(letterBtn)
         .filter(item => item.innerText === str)[0]
         .disabled = true;
}

function AllButtonDisabled(boolean) {
    letterBtn.forEach(function(item) {
        item.disabled = boolean;
    });
}

function gameOver() {
    AllButtonDisabled(true);
    header.innerText = "SHOWER IT OFF"
    correct.style.visibility = "visible";
    correct.innerText = actualTask;
    header.style.color = "rgb(114, 10, 10)"
};

function winner() {
    header.innerText = "THE SHOWER MUST GO ON"
    AllButtonDisabled(true);
    header.style.color = "rgb(52, 105, 8)";
    
}

function checkLetter(letter) {
    letter = letter.toLowerCase();
    actualTask.split("").forEach(function(item, index) {
        if(item === letter) {
            letterDivs[index].innerText = letter;
        }
    });

    if(actualTask.indexOf(letter) < 0) {
        live--;
        hangmanImg.src = `img/hangman_${live}.svg`
        livesText.innerText = live;

        if(live === 0) {
            gameOver();
        }
    } else {
        winningLength = Array.from(letterDivs)
                             .filter(item => !item.innerText).length;

        if(winningLength === 0) {
            winner();
        }    
    }
};

function initDiv() {
    renderDiv = "";
    for (let index = 0; index < actualTask.length; index++) {
        renderDiv += "<div></div>";      
    }
    underlineOfRiddle.innerHTML = renderDiv;
    letterDivs = document.querySelectorAll("#riddle div");
}

function initLives() {
    live = 5;
    livesText.innerText = live;
    hangmanImg.src = `img/hangman_${live}.svg`
}

function initText() {
    correct.style.visibility = "hidden";
    header.innerText = "Showerman"
    header.style.color = "#e1cfe7ff"
}

newGame.addEventListener("click", function() {
    initGame();
})

document.addEventListener("keypress", function(event) {
    if(qwerty.includes(event.key)) {
        checkLetter(event.key);
        buttonDisable(event.key);
    }
});

letterBtn.forEach(function(element) {
    element.addEventListener('click', function(){
        element.disabled = true;
        currentLetter = element.innerText;
        checkLetter(currentLetter);
    });
});

function initGame() {
    
    riddleChooser();
    initDiv();
    AllButtonDisabled(false);
    initLives();
    initText();
    
    console.log(actualTask);
}

initGame();
