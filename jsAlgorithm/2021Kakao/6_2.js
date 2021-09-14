const solution = (board, skill) => {
    const getFinalHeight = (i, j) => {
        let height = board[i][j]
        skill.forEach((s) => {
            const [type, r1, c1, r2, c2, degree] = s
            if (r1 <= i && i <= r2 && c1 <= j && j <= c2) {
                if (type === 1) {
                    height -= degree
                } else {
                    height += degree
                }
            }
        })
        return height
    }
    let count = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (getFinalHeight(i, j) > 0) count++
        }
    }

    return count
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
