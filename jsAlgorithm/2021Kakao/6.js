const solution = (board, skill) => {
    skill.forEach((s) => {
        const [type, r1, c1, r2, c2, degree] = s
        if (type === 1) {
            action(r1, c1, r2, c2, -1 * degree, board)
        } else {
            action(r1, c1, r2, c2, degree, board)
        }
    })
    let count = 0
    for (let i = 0; i < board.length; i++) {
        count += board[i].filter((e) => e > 0).length
    }
    return count
}

const action = (r1, c1, r2, c2, degree, board) => {
    for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
            board[i][j] += degree
        }
    }
}

const print2D = (board) => {
    console.log("=============")
    for (let i = 0; i < board.length; i++) {
        console.log(board[i].join(""))
    }
}

const test = [
    [
        [
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
        ],
        [
            [1, 0, 0, 3, 4, 4],
            [1, 2, 0, 2, 3, 2],
            [2, 1, 0, 3, 1, 2],
            [1, 0, 1, 3, 3, 1],
        ],
    ],
    [
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ],
        [
            [1, 1, 1, 2, 2, 4],
            [1, 0, 0, 1, 1, 2],
            [2, 2, 0, 2, 0, 100],
        ],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
