document.addEventListener('DOMContentLoaded', function () {
    let totalScore = 0;
    const gridSize = 16;
    let gameOver = false;

    // Function to create the game board
    function createBoard() {
        const grid = document.querySelector('.grid');
        for (let i = 0; i < gridSize; i++) {
            const div = document.createElement('div');
            div.setAttribute("id", `id_${i}`);
            div.textContent = 0;
            grid.appendChild(div);
        }
    }
    createBoard();

    // Function to generate a new tile randomly
    function generate() {
        const optionArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        const allBlocks = document.querySelectorAll('.grid > div');
        const emptyBlocks = Array.from(allBlocks).filter(a => a.textContent == 0);
        if (emptyBlocks.length === 0) {
            gameOver = true;
            return;
        }
        const randomNumber = optionArray[Math.floor((Math.random() * 10))];
        const randomBlock = emptyBlocks[Math.floor((Math.random() * emptyBlocks.length))];
        randomBlock.textContent = randomNumber;
    }
    generate();

    // Add event listener to handle keyboard input
    document.addEventListener('keyup', function (event) {
        if (!gameOver) {
            switch (event.keyCode) {
                case 37: // Left arrow
                    moveLeft();
                    break;
                case 38: // Up arrow
                    moveUp();
                    break;
                case 39: // Right arrow
                    moveRight();
                    break;
                case 40: // Down arrow
                    moveDown();
                    break;
            }
            if (!gameOver) {
                generate();
                checkForGameOver();
                checkForWin();
            }
        }
    });

    // Function to check if the game is over
    function checkForGameOver() {
        const allBlocks = document.querySelectorAll('.grid > div');
        const emptyBlocks = Array.from(allBlocks).filter(a => a.textContent == 0);
        if (emptyBlocks.length === 0) {
            gameOver = true;
            document.querySelector('#game-over').style.display = 'block';
        }
    }

    // Function to check if the player has won
    function checkForWin() {
        const allBlocks = document.querySelectorAll('.grid > div');
        const winningBlocks = Array.from(allBlocks).filter(a => a.textContent == 2048);
        if (winningBlocks.length !== 0) {
            gameOver = true;
            document.querySelector('#win').style.display = 'block';
        }
    }

    // Function to move all tiles to the left
    function moveLeft() {
        const allBlocks = document.querySelectorAll('.grid > div');
        allBlocks.forEach(block => {
            const blockId = block.id.split('_')[1];
            let row = Math.floor(blockId / 4);
            let col = blockId % 4;
            let currentBlock = block.textContent;
            if (currentBlock !== '0') {
                let nextCol = col - 1;
                while (nextCol >= 0) {
                    const nextBlock = document.getElementById(`id_${row * 4 + nextCol}`);
                    const nextBlockValue = nextBlock.textContent;
                    if (nextBlockValue === '0') {
                        nextBlock.textContent = currentBlock;
                        block.textContent = '0';
                        block = nextBlock;
                        col = nextCol;
                        nextCol--;
                    } else if (nextBlockValue === currentBlock) {
                        const newValue = parseInt(currentBlock) * 2;
                        nextBlock.textContent = newValue;
                        totalScore += newValue;
                        document.querySelector("#score").textContent = totalScore;
                        block.textContent = '0';
                        break;
                    } else {
                        break;
                    }
                }
            }
        });
    }

    // Function to move all tiles to the right
    function moveRight() {
        const allBlocks = document.querySelectorAll('.grid > div');
        allBlocks.forEach(block => {
            const blockId = block.id.split('_')[1];
            let row = Math.floor(blockId / 4);
            let col = blockId % 4;
            let currentBlock = block.textContent;
            if (currentBlock !== '0') {
                let nextCol = col + 1;
                while (nextCol < 4) {
                    const nextBlock = document.getElementById(`id_${row * 4 + nextCol}`);
                    const nextBlockValue = nextBlock.textContent;
                    if (nextBlockValue === '0') {
                        nextBlock.textContent = currentBlock;
                        block.textContent = '0';
                        block = nextBlock;
                        col = nextCol;
                        nextCol++;
                    } else if (nextBlockValue === currentBlock) {
                        const newValue = parseInt(currentBlock) * 2;
                        nextBlock.textContent = newValue;
                        totalScore += newValue;
                        document.querySelector("#score").textContent = totalScore;
                        block.textContent = '0';
                        break;
                    } else {
                        break;
                    }
                }
            }
        });
    }

    // Function to move all tiles up
    function moveUp() {
        const allBlocks = document.querySelectorAll('.grid > div');
        allBlocks.forEach(block => {
            const blockId = block.id.split('_')[1];
            let row = Math.floor(blockId / 4);
            let col = blockId % 4;
            let currentBlock = block.textContent;
            if (currentBlock !== '0') {
                let nextRow = row - 1;
                while (nextRow >= 0) {
                    const nextBlock = document.getElementById(`id_${nextRow * 4 + col}`);
                    const nextBlockValue = nextBlock.textContent;
                    if (nextBlockValue === '0') {
                        nextBlock.textContent = currentBlock;
                        block.textContent = '0';
                        block = nextBlock;
                        row = nextRow;
                        nextRow--;
                    } else if (nextBlockValue === currentBlock) {
                        const newValue = parseInt(currentBlock) * 2;
                        nextBlock.textContent = newValue;
                        totalScore += newValue;
                        document.querySelector("#score").textContent = totalScore;
                        block.textContent = '0';
                        break;
                    } else {
                        break;
                    }
                }
            }
        });
    }

    // Function to move all tiles down
    function moveDown() {
        const allBlocks = document.querySelectorAll('.grid > div');
        allBlocks.forEach(block => {
            const blockId = block.id.split('_')[1];
            let row = Math.floor(blockId / 4);
            let col = blockId % 4;
            let currentBlock = block.textContent;
            if (currentBlock !== '0') {
                let nextRow = row + 1;
                while (nextRow < 4) {
                    const nextBlock = document.getElementById(`id_${nextRow * 4 + col}`);
                    const nextBlockValue = nextBlock.textContent;
                    if (nextBlockValue === '0') {
                        nextBlock.textContent = currentBlock;
                        block.textContent = '0';
                        block = nextBlock;
                        row = nextRow;
                        nextRow++;
                    } else if (nextBlockValue === currentBlock) {
                        const newValue = parseInt(currentBlock) * 2;
                        nextBlock.textContent = newValue;
                        totalScore += newValue;
                        document.querySelector("#score").textContent = totalScore;
                        block.textContent = '0';
                        break;
                    } else {
                        break;
                    }
                }
            }
        });
    }

    // Function to restart the game
    document.querySelector('#restart-button').addEventListener('click', function () {
        document.querySelector('.grid').innerHTML = '';
        totalScore = 0;
        document.querySelector("#score").textContent = totalScore;
        document.querySelector('#game-over').style.display = 'none';
        document.querySelector('#win').style.display = 'none';
        createBoard();
        generate();
        gameOver = false;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle button");

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
    });
});

