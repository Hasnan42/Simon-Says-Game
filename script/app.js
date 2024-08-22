let paragraph = document.querySelector('p');
let arr = ["divone", "divtwo", "divthree","divfour"];
let level = 0;
let start = false;
let userSeq = [];
let GameSeq = [];

document.addEventListener('keypress', () => {
    if (!start) {
        gameStart();
        start = true;
    }
});

function gameStart() {
    userSeq = [];
    level++;
    paragraph.innerText = `Level ${level}`;
    let randColor = Math.floor((Math.random() * 4));
    let randBtn = arr[randColor];
    let btn = document.querySelector(`.${randBtn}`);
    gameflashButton(btn);
}

function gameflashButton(btn) {
    btn.classList.add('gameflash');
    GameSeq.push(btn);
    // console.log(GameSeq);
    setTimeout(() => {
        btn.classList.remove('gameflash');
    }, 700);
}

function btnpress() {
    this.classList.add('userflash');
    userSeq.push(this);
    setTimeout(() => {
        this.classList.remove('userflash');
    }, 700);
    checkAns(userSeq.length - 1);
}

let btns = document.querySelectorAll('.btn');
for (let btn of btns) {
    btn.addEventListener('click', function () {
        btnpress.call(this); // Use `call` to set the context to the clicked button
    });
}

function checkAns(ind) {
    if (userSeq[ind] === GameSeq[ind]) {
        if (userSeq.length === GameSeq.length) {
            // If user has completed the sequence correctly, proceed to next level
            setTimeout(gameStart, 700);
        }
    } else {
        // If the sequence is incorrect, show game over message and reset
        paragraph.innerText = 'Game Over! Press Any Key to Start Again';
        alert(`Your level was ${level}`)
        document.addEventListener('keypress', resetGame()); // Ensure reset only happens once per game over
    }
}

function resetGame() {
    level = 0;
    start = false;
    userSeq = [];
    GameSeq = [];
    paragraph.innerText = 'Press Any Key to Start';
}
