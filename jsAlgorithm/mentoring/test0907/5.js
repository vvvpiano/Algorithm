const solution = (n, build_frame) => {
    const building = []
    build_frame.forEach((frame) => {
        const [x, y, type, command] = frame
        if (command === 1) {
            building.push([x, y, type])
            if (!isOk(building)) building.pop()
        } else {
            let removeIndex = findFrame([x, y, type], building)
            const deleted = building.splice(removeIndex, 1)[0]
            if (!isOk(building)) building.push(deleted)
        }
    })
    return building.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0]
        else if (a[1] !== b[1]) return a[1] - b[1]
        else return a[2] - b[2]
    })
}

const isOk = (building) => {
    for (let i = 0; i < building.length; i++) {
        const frame = building[i]
        if (!checkFrame(frame, building)) {
            return false
        }
    }
    return true
}

const checkFrame = (frame, building) => {
    const [x, y, type] = frame
    if (type === 0) {
        // 0은 기둥
        if (y === 0 || findFrame([x, y - 1, 0], building) >= 0) return true
        else if (findFrame([x - 1, y, 1], building) >= 0 || findFrame([x, y, 1], building) >= 0) return true
        return false
    } else {
        // 1은 보
        if (findFrame([x, y - 1, 0], building) >= 0 || findFrame([x + 1, y - 1, 0], building) >= 0) return true
        else if (findFrame([x - 1, y, 1], building) >= 0 && findFrame([x + 1, y, 1], building) >= 0) return true
        else false
    }
}

const findFrame = (frame, building) => {
    // console.log("find:", frame)
    const [x, y, type] = frame
    for (let i = 0; i < building.length; i++) {
        const b = building[i]
        if (x === b[0] && y === b[1] && type === b[2]) {
            // console.log(i)
            return i
        }
    }
    return -1
}

const test = [
    [
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [2, 1, 0, 1],
        [2, 2, 1, 1],
        [5, 0, 0, 1],
        [5, 1, 0, 1],
        [4, 2, 1, 1],
        [3, 2, 1, 1],
    ],
    [
        [0, 0, 0, 1],
        [2, 0, 0, 1],
        [4, 0, 0, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 1, 1, 1],
        [3, 1, 1, 1],
        [2, 0, 0, 0],
        [1, 1, 1, 0],
        [2, 2, 0, 1],
    ],
]

const ansewr = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [2, 1, 0],
        [2, 2, 1],
        [3, 2, 1],
        [4, 2, 1],
        [5, 0, 0],
        [5, 1, 0],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 1],
        [2, 1, 1],
        [3, 1, 1],
        [4, 0, 0],
    ],
]

for (let i = 0; i < test.length; i++) {
    const result = solution(5, test[i])
    console.log("answer", result)
}
