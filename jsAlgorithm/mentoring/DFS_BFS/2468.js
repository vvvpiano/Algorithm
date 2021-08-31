const fs = require("fs")
let input = fs.readFileSync("../.././test.txt").toString().trim().split("\n")
const N = parseInt(input.shift())
const heights = input.map((line) => line.split(" ").map(Number))

const solution = (N, heights) => {
    const [startHeight, endHeight] = getMinMaxHeight(N, heights)
    if (startHeight === endHeight) return 1
    let answer = 0
    let waterHeight = startHeight
    while (true) {
        if (waterHeight > endHeight) break
        const NofSafeAreas = findIsolatedArea(N, heights, waterHeight)
        if (answer < NofSafeAreas) {
            answer = NofSafeAreas
        }
        waterHeight++
    }
    return answer
}

const findIsolatedArea = (N, heights, waterHeight) => {
    console.log("=======waterHeigts", waterHeight, "=======")
    if (waterHeight === 0) return 1
    let count = 0
    const isVisited = []
    for (let i = 0; i < N; i++) {
        isVisited.push(new Array(N).fill(0))
    }
    const q = []

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (isVisited[i][j] !== 0) {
                continue // 이미 검사한 곳이면 continue
            }
            if (heights[i][j] <= waterHeight) {
                isVisited[i][j] = 1
                continue
            } else {
                isVisited[i][j] = 2
                q.push([i, j])
            }
            while (q.length > 0) {
                const [c_i, c_j] = q.shift()
                for (let k = 0; k < 4; k++) {
                    const [n_i, n_j] = getNextPosition(c_i, c_j, k)
                    if (!isInRange(n_i, n_j, N) || isVisited[n_i][n_j] !== 0) continue
                    if (heights[n_i][n_j] <= waterHeight) isVisited[n_i][n_j] = 1
                    else {
                        q.push([n_i, n_j])
                        isVisited[n_i][n_j] = 2
                    }
                }
            }
            console.log(isVisited)
            count++
        }
    }
    console.log("최종 isvisited", isVisited)
    console.log("count:", count)
    return count
}

const getNextPosition = (i, j, direction) => {
    const nextPositions = [
        [i, j + 1],
        [i, j - 1],
        [i + 1, j],
        [i - 1, j],
    ]
    return nextPositions[direction]
}

const isInRange = (i, j, N) => {
    if (i < 0 || i >= N) return false
    if (j < 0 || j >= N) return false
    return true
}

const getMinMaxHeight = (N, heights) => {
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (min > heights[i][j]) {
                min = heights[i][j]
            }
            if (max < heights[i][j]) {
                max = heights[i][j]
            }
        }
    }
    return [min, max]
}

console.log(solution(N, heights))
