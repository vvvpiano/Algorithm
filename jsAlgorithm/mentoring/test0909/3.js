const solution = (info, query) => {
    const database = {}
    insertInfo(info, database)
    // console.log(database)
    const answer = []
    query.forEach((q) => {
        const queryWord = q.split(" ").filter((w) => w !== "and")
        answer.push(find(queryWord, database))
    })
    return answer
}

const insertInfo = (info, database) => {
    info.forEach((row) => {
        const values = row.split(" ")
        const testScore = parseInt(values.pop())
        const key = makeKey(values)
        if (database[key]) database[key].push(testScore)
        else database[key] = [testScore]
    })
    const keys = Object.keys(database)
    keys.forEach((key) => database[key].sort((a, b) => b - a))
}

const makeKey = (condition) => {
    let key = ""
    condition.forEach((c) => {
        key += c.charAt(0)
    })
    return key
}

const find = (q, database) => {
    const cases = [
        ["cpp", "java", "python"],
        ["backend", "frontend"],
        ["junior", "senior"],
        ["chicken", "pizza"],
    ]
    const testScore = parseInt(q.pop())
    // console.log(q, testScore)
    const spreadQuery = []
    for (let i = 0; i < q.length; i++) {
        if (q[i] !== "-") spreadQuery.push([q[i]])
        else spreadQuery.push(cases[i])
    }

    let count = 0
    for (let i = 0; i < spreadQuery[0].length; i++) {
        const lang = spreadQuery[0][i]
        for (let j = 0; j < spreadQuery[1].length; j++) {
            const position = spreadQuery[1][j]
            for (let k = 0; k < spreadQuery[2].length; k++) {
                const career = spreadQuery[2][k]
                for (let l = 0; l < spreadQuery[3].length; l++) {
                    const food = spreadQuery[3][l]
                    const key = makeKey([lang, position, career, food])
                    const scores = database[key]
                    // console.log(key, scores)
                    if (scores) {
                        count += binarySearch(testScore, scores)
                        // console.log(binarySearch(testScore, scores))
                    }
                }
            }
        }
    }
    return count
}

const binarySearch = (score, array) => {
    let low = 0
    let high = array.length - 1
    let answer, mid
    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        if (array[mid] >= score) {
            answer = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    if (answer === undefined) return 0
    return answer + 1
}

const info = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"]

const query = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"]

console.log("answer:", solution(info, query))
