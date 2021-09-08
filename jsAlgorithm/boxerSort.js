class Boxer {
    constructor(no, weight) {
        this.no = no
        this.weight = weight
        this.winningRate = null
        this.beatHeavierCount = 0
    }
}

function solution(weights, head2head) {
    const boxers = []
    for (let i = 0; i < weights.length; i++) {
        boxers.push(new Boxer(i + 1, weights[i]))
    }

    for (let i = 0; i < head2head.length; i++) {
        const boxer = boxers[i]
        let matchCount = 0
        let winningCount = 0
        for (let j = 0; j < head2head[i].length; j++) {
            if (i === j || head2head[i].charAt(j) === "N") continue
            const counterBoxer = boxers[j]
            matchCount++
            if (head2head[i].charAt(j) === "W") {
                winningCount++
                if (counterBoxer.weight > boxer.weight) boxer.beatHeavierCount++
            }
        }
        boxer.winningRate = matchCount !== 0 ? winningCount / matchCount : 0
    }
    boxers.sort((a, b) => {
        if (a.winningRate !== b.winningRate) return b.winningRate - a.winningRate
        else if (a.beatHeavierCount !== b.beatHeavierCount) return b.beatHeavierCount - a.beatHeavierCount
        else if (a.weight !== b.weight) return b.weight - a.weight
        else return a.no - b.no
    })
    return boxers.map((boxer) => boxer.no)
}

const test = [
    [
        [50, 82, 75, 120],
        ["NLWL", "WNLL", "LWNW", "WWLN"],
    ],
    [
        [145, 92, 86],
        ["NLW", "WNL", "LWN"],
    ],
    [
        [60, 70, 60],
        ["NNN", "NNN", "NNN"],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
