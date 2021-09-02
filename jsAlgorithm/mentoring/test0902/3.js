const solution = (relation) => {
    let count = 0
    let attributes = relation[0].length
    let NofRecords = relation.length
    let combination = makeCombination(attributes)
    let keys = []
    while (combination.length > 0) {
        const key = combination.shift()
        const tuples = relation.map((row) => {
            let string = ""
            for (let i = 0; i < row.length; i++) {
                if (key.includes(i)) string += row[i]
            }
            return string
        })
        const set = new Set(tuples)
        console.log(set)
        if (set.size === NofRecords) {
            // count++
            keys.push(key)
        }
    }
    keys.sort((a, b) => a.length - b.length)
    console.log(keys)
    while (keys.length > 0) {
        count++
        let key = keys.shift()
        keys = keys.filter((arr) => !isInclude(key, arr))
    }
    return count
}

const isInclude = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return false
    }
    return true
}

const makeCombination = (N) => {
    let combination = []

    const recursion = (array, start, depth) => {
        if (array.length > 0) combination.push(array)
        if (depth === N) {
            return
        }
        for (let i = start; i < N; i++) {
            recursion(array.concat([i]), i + 1, depth + 1)
        }
    }

    recursion([], 0, 0)
    return combination
}
const relation = [
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"],
]

console.log("answer:", solution(relation))
