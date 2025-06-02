let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow", "red", "purple", "green"];

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    //to flash while tap the btn
    btn.classList.add("gameFlash");

    //remove that flash after 1 sec
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    //to flash while tap the btn
    btn.classList.add("userFlash");

    //remove that flash after 1 sec
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    if(highScore < level) {
        highScore = level;
    }
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);

    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log("curr level = ", level);
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>High Score = ${highScore}<b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#EAE4D5";
        }, 150);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}