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



