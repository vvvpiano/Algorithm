const solution = (key, lock) => {
    const padLock = makePadding(lock, key.length)
    // print2d(padLock)
    for (let i = 0; i < 4; i++) {
        // print2d(key)
        if (tryOpen(key, padLock)) return true
        key = rotate90Key(key)
    }
    return false
}

const makePadding = (lock, M) => {
    const map = []
    for (let i = 0; i < lock.length + (M - 1) * 2; i++) {
        map.push(new Array(lock.length + (M - 1) * 2).fill(-1))
    }
    for (let i = 0; i < lock.length; i++) {
        for (let j = 0; j < lock.length; j++) {
            map[M - 1 + i][M - 1 + j] = lock[i][j]
        }
    }
    return map
}

const tryOpen = (key, padLock) => {
    for (let i = 0; i <= padLock.length - key.length; i++) {
        for (let j = 0; j <= padLock.length - key.length; j++) {
            if (canOpen(key, padLock, i, j)) return true
        }
    }
    return false
}

const canOpen = (key, padLock, startI, startJ) => {
    const map = copy2d(padLock)
    // console.log(startI, startJ)
    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < key.length; j++) {
            const lockValue = padLock[startI + i][startJ + j]
            const keyValue = key[i][j]
            // console.log(startI + i, startJ + j, i, j, lockValue, keyValue)
            if (lockValue === 1 && keyValue === 1) {
                return false
            }
            if (lockValue === 0) {
                if (keyValue === 0) return false
                map[startI + i][startJ + j] = 1
            }
        }
    }
    // print2d(map)
    for (let i = 0; i < map.length; i++) {
        if (map[i].filter((e) => e === 0).length > 0) return false
    }
    return true
}

const copy2d = (origin) => {
    const copy = []
    for (let i = 0; i < origin.length; i++) {
        copy[i] = []
        for (let j = 0; j < origin[i].length; j++) {
            copy[i][j] = origin[i][j]
        }
    }
    return copy
}

const rotate90Key = (key) => {
    const rotatedKey = []
    for (let i = 0; i < key.length; i++) {
        rotatedKey[i] = new Array(key.length)
    }
    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < key.length; j++) {
            rotatedKey[i][j] = key[key.length - 1 - j][i]
        }
    }
    return rotatedKey
}

const print2d = (map) => {
    console.log("===============")
    for (let i = 0; i < map.length; i++) {
        console.log(map[i].join(""))
    }
}

const test = [
    [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
]

console.log("answer:", solution(...test))
