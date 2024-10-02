const Player = (name, marker) => {
    return { name, marker }
}

const Gameboard = (() => {
    const rows = 3;
    const columns = 3;
    let board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("")
        }
    }

    const getBoard = () => board;

    const updateBoard = (row, col, marker) => {
        if (board[row][col] === "") {
            board[row][col] = marker
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }

    return { getBoard, updateBoard, resetBoard }
})()

const gameController = (() => {
    const player1 = Player("player 1", "X")
    const player2 = Player("player 2", "O");
    let gameover = false;
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return currentPlayer.name;
            }
        }
        return board.flat().includes("") ? null : "Draw";
    }

    const playRound = (row, col) => {
        if (gameover) return;

        if (Gameboard.updateBoard(row, col, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at (${row}, ${col})`)
            const result = checkWinner();
            if (result) {
                console.log(result === "Draw" ? "It's a draw!" : `${result} wins!`)
                gameover = true;
            } else {
                switchPlayer()
            }
        } else {
            console.log("Position already taken. Choose another spot.");
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameover = false;
    };

    return { playRound, restartGame, getCurrentPlayer }
})()


const displayController = (() => {
    const gameBoardDiv = document.getElementById("gameBoard")

    const render = () => {
        const board = Gameboard.getBoard();

        gameBoardDiv.innerHTML = "";

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.textContent = cell;
                cellDiv.addEventListener("click", () => {
                    handleClick(rowIndex, colIndex)
                });
                gameBoardDiv.appendChild(cellDiv);
            })
        })
    }

    const handleClick = (row, col) => {

        gameController.playRound(row, col);

        render();
    }

    return { render }

})()

// Initialize the board on page load
displayController.render();
