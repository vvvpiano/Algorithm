const solution = (game_board, table) => {
    const emptyAreas = getArea(game_board, true)
    const blocks = getArea(table, false)
    let count = 0
    blocks.forEach((block) => {
        // console.log(block[0])
        let removeAreaIndex
        for (let i = 0; i < emptyAreas.length; i++) {
            let removeIndex = emptyAreas[i].indexOf(block[0])
            if (removeIndex >= 0) {
                removeAreaIndex = i
                // console.log(emptyAreas[i][removeIndex])
                count += block[1]
                break
            }
        }
        if (removeAreaIndex >= 0) emptyAreas.splice(removeAreaIndex, 1)
        // console.log("empty:", emptyAreas)
    })
    return count
}

const getArea = (board, findEmpty) => {
    const isTarget = findEmpty ? (value) => value === 0 : (value) => value !== 0
    let isVisited = []
    for (let i = 0; i < board.length; i++) {
        isVisited.push(new Array(board.length).fill(0))
    }

    const areas = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (isVisited[i][j] === 0 && isTarget(board[i][j])) {
                const figure = []
                const queue = [[i, j]]
                isVisited[i][j] = 1
                while (queue.length > 0) {
                    const [c_r, c_c] = queue.shift()
                    figure.push([c_r, c_c])
                    for (let i = 0; i < 4; i++) {
                        const [n_r, n_c] = getNextPosition(c_r, c_c, i)
                        if (isInRange(n_r, n_c, board.length) && isVisited[n_r][n_c] === 0 && isTarget(board[n_r][n_c])) {
                            queue.push([n_r, n_c])
                            isVisited[n_r][n_c] = 1
                        }
                    }
                }
                if (findEmpty) areas.push(turnFigure(figure, board.length))
                else {
                    const sequence = normalize(figure.map((point) => point[0] * board.length + point[1]).sort((a, b) => a - b))
                    areas.push([sequence.join(""), sequence.length])
                }
            }
        }
    }
    return areas
}

const turnFigure = (figure, N) => {
    // console.log(figure)
    const rowPoints = figure.map((point) => point[0])
    const colPoints = figure.map((point) => point[1])
    const midRow = Math.floor((Math.min(...rowPoints) + Math.max(...rowPoints)) / 2)
    const midCol = Math.floor((Math.min(...colPoints) + Math.max(...colPoints)) / 2)
    const turnedFigures = []
    for (let i = 0; i < 4; i++) {
        const sequence = normalize(figure.map((point) => point[0] * N + point[1]).sort((a, b) => a - b))
        if (!turnedFigures.includes(sequence.join(""))) turnedFigures.push(sequence.join(""))
        figure = turn90(figure, midRow, midCol)
    }
    // console.log(turnedFigures)
    return turnedFigures
}

const turn90 = (figure, midRow, midCol) => {
    const turned = figure.map((point) => {
        const rowDiff = point[0] - midRow
        const colDiff = point[1] - midCol
        return [midRow + colDiff, midCol - rowDiff]
    })
    return turned
}

const normalize = (block) => {
    const min = Math.min(...block)
    return block.map((e) => e - min)
}

const getNextPosition = (row, col, i) => {
    const direction = [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
    ]
    return direction[i]
}

const isInRange = (i, j, N) => {
    if (i < 0 || i >= N) return false
    if (j < 0 || j >= N) return false
    return true
}

const test = [
    [
        [
            [1, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 1, 1, 0, 0, 1],
            [1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
        ],
        [
            [1, 0, 0, 1, 1, 0],
            [1, 0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1],
            [0, 0, 1, 0, 0, 0],
            [1, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
        ],
    ],
    [
        [
            [0, 0, 0],
            [1, 1, 0],
            [1, 1, 1],
        ],
        [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0],
        ],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
