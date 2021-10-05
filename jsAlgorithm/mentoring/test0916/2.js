const solution = (rows, columns, queries) => {
    let board = []
    const answer = []
    initializeBoard(rows, columns, board)
    queries.forEach((query) => {
        const [newBoard, min] = doQuery(query, board)
        board = newBoard
        answer.push(min)
    })
    return answer
}

const doQuery = (query, board) => {
    const [r1, c1, r2, c2] = query.map((e) => e - 1)
    const newBoard = []
    for (let i = 0; i < board.length; i++) {
        newBoard[i] = new Array(board[i].length)
    }
    let min = 10001
    const setMin = (number) => {
        if (number < min) min = number
    }
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
            if (i === r1 && j === c1) {
                newBoard[i][j] = board[i + 1][j]
                setMin(board[i + 1][j])
            } else if (i === r1 && c1 < j && j <= c2) {
                newBoard[i][j] = board[i][j - 1]
                setMin(board[i][j - 1])
            } else if (j === c2 && r1 < i && i <= r2) {
                newBoard[i][j] = board[i - 1][j]
                setMin(board[i - 1][j])
            } else if (i === r2 && c1 <= j && j < c2) {
                newBoard[i][j] = board[i][j + 1]
                setMin(board[i][j + 1])
            } else if (j === c1 && r1 <= i && i < r2) {
                newBoard[i][j] = board[i + 1][j]
                setMin(board[i + 1][j])
            } else newBoard[i][j] = board[i][j]
        }
    }
    return [newBoard, min]
}

const initializeBoard = (rows, columns, board) => {
    let num = 1
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(columns)
        for (let j = 0; j < columns; j++) {
            board[i][j] = num++
        }
    }
}

const test = [
    [
        6,
        6,
        [
            [2, 2, 5, 4],
            [3, 3, 6, 6],
            [5, 1, 6, 3],
        ],
    ],
    [
        3,
        3,
        [
            [1, 1, 2, 2],
            [1, 2, 2, 3],
            [2, 1, 3, 2],
            [2, 2, 3, 3],
        ],
    ],
    [100, 97, [[1, 1, 100, 97]]],
]

test.forEach((t) => console.log("answer:", solution(...t)))
