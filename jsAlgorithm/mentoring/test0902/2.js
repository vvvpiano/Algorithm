const solution = (N, stages) => {
    const userState = new Array(N + 2).fill(0)
    stages.forEach((stage) => {
        for (let i = 1; i <= stage; i++) {
            userState[i]++
        }
    })
    const failRate = []
    for (let i = 1; i <= N; i++) {
        const failUser = userState[i] - userState[i + 1]
        failRate[i - 1] = { stage: i, rate: failUser / userState[i] }
    }
    failRate.sort((a, b) => b.rate - a.rate)
    return failRate.map((e) => e.stage)
}

const test = [
    [5, [2, 1, 2, 6, 2, 4, 3, 3]],
    [4, [4, 4, 4, 4, 4]],
]

for (let i = 0; i < test.length; i++) {
    console.log("answer:", solution(...test[i]))
}
