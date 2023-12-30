let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let bestScore = 0;

let h3 = document.querySelector("h3");
let start = document.querySelector("#start");
start.addEventListener("click", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    start.classList.add("startbtn");
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  if(level > 5){
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 150);
  } else if(level > 10){
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 100);
  } else if(level > 15){
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 50);
  }else{
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 200);
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press play to start the game.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    let best = document.querySelector("#best");
    bestScore = Math.max(level,bestScore);
    best.innerText = `Best Score : ${bestScore}`;

    reset();
  }
}

function btnPress() {
  let btn = this;
  gameFlash(btn);

  userColor = btn.getAttribute("id");
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
  start.classList.remove("startbtn");
}
