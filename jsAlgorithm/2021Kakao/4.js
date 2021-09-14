const solution = (n, info) => {
    const rionCases = shoot(n)
    let maxRionScoreDiff = 0
    let maxRionScoreInfo = [-1]
    const rionScoreInfos = rionCases.map((scores) => {
        let rionScoreInfo = new Array(11).fill(0)
        scores.forEach((score) => rionScoreInfo[score]++)
        return rionScoreInfo
    })

    rionScoreInfos.sort((a, b) => {
        for (let i = 0; i <= 9; i++) {
            if (a[i] !== b[i]) return b[i] - a[i]
        }
        return b[10] - a[10]
    })

    info.reverse()
    rionScoreInfos.forEach((rionScoreInfo) => {
        let apeachWinning = 0
        let rionWinning = 0
        for (let i = 0; i < info.length; i++) {
            if (info[i] === 0 && rionScoreInfo[i] === 0) continue
            if (info[i] < rionScoreInfo[i]) rionWinning += i
            else apeachWinning += i
        }
        if (rionWinning > apeachWinning) {
            if (maxRionScoreDiff < rionWinning - apeachWinning) {
                maxRionScoreDiff = rionWinning - apeachWinning
                maxRionScoreInfo = rionScoreInfo
            }
        }
    })
    return maxRionScoreInfo.reverse()
}

const shoot = (n) => {
    const cases = []

    const recursion = (array, start, current) => {
        if (current === n) {
            cases.push(array)
            return
        }
        for (let i = start; i < 11; i++) {
            recursion(array.concat([i]), i, current + 1)
        }
    }
    recursion([], 0, 0)
    return cases
}

const test = [
    [5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]],
    [1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]],
    [10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]],
]

test.forEach((t) => console.log("answer:", solution(...t)))
