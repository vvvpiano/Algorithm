const solution = (orders, course) => {
    // console.log(orders)
    const combLists = {}
    orders.forEach((order) => {
        for (let i = 2; i <= order.length; i++) {
            const combination = makeCombination(order, i)
            combination.forEach((comb) => {
                const key = comb.sort().join("")
                if (combLists[key]) combLists[key]++
                else combLists[key] = 1
            })
        }
    })
    // console.log(combLists)
    const keys = Object.keys(combLists)
    const answer = []
    course.forEach((num) => {
        let maxFrequency = 0
        const numKeys = []
        for (let i = 0; i < keys.length; i++) {
            if (keys[i].length !== num || combLists[keys[i]] < 2) continue
            numKeys.push(keys[i])
            if (maxFrequency < combLists[keys[i]]) maxFrequency = combLists[keys[i]]
        }
        answer.push(...numKeys.filter((e) => combLists[e] === maxFrequency))
    })
    return answer.sort()
}

const makeCombination = (menus, num) => {
    let combination = []
    const recursion = (array, start, depth) => {
        if (array.length === depth) {
            combination.push(array)
            return
        }
        for (let i = start; i < menus.length; i++) {
            recursion(array.concat([menus[i]]), i + 1, depth)
        }
    }
    recursion([], 0, num)
    return combination
}

const test = [
    [
        ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],
        [2, 3, 4],
    ],
    [
        ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"],
        [2, 3, 5],
    ],
    [
        ["XYZ", "XWY", "WXA"],
        [2, 3, 4],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
