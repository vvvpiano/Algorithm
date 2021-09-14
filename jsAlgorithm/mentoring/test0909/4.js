const solution = (board, r, c) => {
    const cardInfo = {}
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (cardInfo[board[i][j]]) cardInfo[board[i][j]].push([i, j].join(""))
                else cardInfo[board[i][j]] = [[i, j].join("")]
            }
        }
    }
    const cardKeys = Object.keys(cardInfo)
    const cardOrder = makeCardOrder(cardKeys)
    const visitOrder = makeVisitOrder(cardOrder, cardInfo)
    let min = Number.MAX_SAFE_INTEGER
    visitOrder.forEach((order) => {
        const moveCount = getMoveCount([r, c], order, board)
        if (moveCount < min) min = moveCount
    })
    return min
}

const makeCardOrder = (cardNumbers) => {
    let combination = []
    const recursion = (array, depth) => {
        if (array.length === depth) {
            combination.push(array)
            return
        }
        for (let i = 0; i < cardNumbers.length; i++) {
            const next = cardNumbers[i]
            if (!array.includes(next)) recursion(array.concat([next]), depth)
        }
    }
    recursion([], cardNumbers.length)
    return combination
}

const makeVisitOrder = (cardOrder, cardInfo) => {
    const visitOrder = []
    const recursion = (array, currentDepth, depth, cardKeys) => {
        if (currentDepth === depth) {
            visitOrder.push(array)
            return
        }
        const currentCard = cardKeys[currentDepth]
        const [card1, card2] = cardInfo[currentCard]
        recursion(array.concat([card1, card2]), currentDepth + 1, depth, cardKeys)
        recursion(array.concat([card2, card1]), currentDepth + 1, depth, cardKeys)
    }
    cardOrder.forEach((co) => {
        recursion([], 0, co.length, co)
    })
    return visitOrder
}

const copyBoard = (board) => {
    const newBoard = []
    for (let i = 0; i < board.length; i++) {
        newBoard[i] = [...board[i]]
    }
    return newBoard
}

const getMoveCount = (current, order, board) => {
    const map = copyBoard(board)
    let answer = 0

    for (let i = 0; i < order.length; i++) {
        const next = order[i].split("").map(Number)
        const buttonPush = move(current, next, map)
        answer += buttonPush
        if (i % 2 === 1) {
            map[current[0]][current[1]] = 0
            map[next[0]][next[1]] = 0
        }
        current = next
    }
    return answer + order.length
}

const move = (current, next, board) => {
    const [c_r, c_c] = current
    const [n_r, n_c] = next

    if (c_r === n_r && c_c === n_c) return 0

    const queue = []
    const isVisited = []
    let min = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < 4; i++) {
        isVisited.push(new Array(4).fill(0))
    }
    queue.push([c_r, c_c, 0])
    isVisited[c_r][c_c] = 1
    while (queue.length > 0) {
        const [cur_r, cur_c, moveCount] = queue.shift()
        if (cur_r === n_r && cur_c === n_c) {
            return moveCount
        }

        for (let i = 0; i < 4; i++) {
            // 방향키로 이동
            let [next_r, next_c] = getNext(cur_r, cur_c, i)
            if (isInRange(next_r, next_c) && isVisited[next_r][next_c] === 0) {
                isVisited[next_r][next_c] = 1
                queue.push([next_r, next_c, moveCount + 1])
            }
            // ctrl+방향키로 이동
            let ctrl_r, ctrl_c
            next_r = cur_r
            next_c = cur_c
            while (true) {
                let [temp_r, temp_c] = getNext(next_r, next_c, i)
                if (!isInRange(temp_r, temp_c)) break
                ctrl_r = temp_r
                ctrl_c = temp_c
                if (board[ctrl_r][ctrl_c] !== 0) break
                next_r = ctrl_r
                next_c = ctrl_c
            }
            if (ctrl_r !== undefined && ctrl_c !== undefined && isVisited[ctrl_r][ctrl_c] === 0) {
                isVisited[ctrl_r][ctrl_c] = 1
                queue.push([ctrl_r, ctrl_c, moveCount + 1])
            }
        }
    }
    throw new Error("이동 실패")
}

const getNext = (r, c, i) => {
    const direction = [
        [r, c + 1],
        [r, c - 1],
        [r + 1, c],
        [r - 1, c],
    ]
    return direction[i]
}

const isInRange = (r, c) => {
    if (r < 0 || r >= 4) return false
    if (c < 0 || c >= 4) return false
    return true
}

const test = [
    [
        [
            [1, 0, 0, 3],
            [2, 0, 0, 0],
            [0, 0, 0, 2],
            [3, 0, 1, 0],
        ],
        1,
        0,
    ],
    [
        [
            [3, 0, 0, 2],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [2, 0, 0, 3],
        ],
        0,
        1,
    ],
]

test.forEach((t) => console.log("answer", solution(...t)))
