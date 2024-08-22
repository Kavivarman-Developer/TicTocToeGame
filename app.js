const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const restartBtn = document.querySelector('#restart');

let x = 'X';
let o = 'O';

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = x;
let player = "X";
let running = false;

init();

function init() {
    boxs.forEach((box, index) => {
        box.dataset.index = index; // Add index to each box
        box.addEventListener('click', boxClick);
    });
    restartBtn.addEventListener('click', restartGame);
    statusTxt.textContent = `${player} your turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != '' || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerText = player;
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${player} your turn`;
}

function checkWinner() {
    // Check each winning combination
    for (const [a, b, c] of wins) {
        const valueA = options[a];
        const valueB = options[b];
        const valueC = options[c];
        
        if(valueA === "" || valueB === "" || valueC === "") {
            continue;
        }

        if (valueA === valueB && valueB === valueC) {
            statusTxt.textContent = `${player} Won..`;
            running = false;
            boxs[a].classList.add('win');
            boxs[b].classList.add('win');
            boxs[c].classList.add('win');
            return; 
        }
    }

    // Check for a draw
    if (!options.includes("")) {
        statusTxt.textContent = `Game Draw...!`;
        running = false;
    } else {
        // No winner and not a draw, so switch players
        changePlayer();
    }
}

function restartGame() {
    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = x;
    player = "X";
    running = true;
    statusTxt.textContent = `${player} your turn`;

    boxs.forEach(box => {
        box.innerText = '';
        box.classList.remove('win'); // Remove the win class on restart
    });
}
