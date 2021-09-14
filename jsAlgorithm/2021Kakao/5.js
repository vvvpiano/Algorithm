class Node {
    constructor(no, animal) {
        this.no = no
        this.animal = animal
        this.child = []
        this.isVisited = false
    }
}

const solution = (info, edges) => {
    const nodes = []
    for (let i = 0; i < info.length; i++) {
        nodes[i] = new Node(i, info[i])
    }
    for (let i = 0; i < edges.length; i++) {
        const [parent, child] = edges[i]
        nodes[parent].child.push(nodes[child])
    }
    nodes.forEach((node) => {
        console.log(node.no, countAnimals(node))
    })
    let currentNode = nodes[0]
    let sheep = 1
    let wolf = 0
    let canGoNode = [...nodes[0].child]
    let last
    a: while (true) {
        let i = 0
        while (i < canGoNode.length) {
            if (canGoNode[i].isVisited) continue
            if (canGoNode[i].animal === 0) {
                canGoNode[i].isVisited = true
                sheep++
                canGoNode = canGoNode.concat(canGoNode[i].child)
            } else {
                const [childSheep, childWolf] = countAnimals(canGoNode[i])
                if (childSheep === 0) {
                    canGoNode[i].isVisited = true
                }
            }
            i++
        }
        console.log("before filter", canGoNode)
        canGoNode = canGoNode.filter((node) => !node.isVisited)
        if (last !== canGoNode.length) last = canGoNode.length
        else {
            // break;
            const afterCanGoNode = canGoNode.map((node) => {
                const [childSheep, childWolf] = countAnimals(node)
                return [sheep + childSheep, wolf + 1 + childWolf]
            })
            let max = 0
            let maxIndex = -1
            for (let i = 0; i < afterCanGoNode.length; i++) {
                const [afterSheep, afterWolf] = afterCanGoNode[i]
                if (afterSheep <= afterWolf) continue
                if (afterSheep - afterWolf > max) {
                    max = afterSheep - afterWolf
                    maxIndex = i
                }
            }
            console.log(maxIndex)
            if (maxIndex >= 0) {
                const nextNode = canGoNode[maxIndex]
                nextNode.isVisited = true
                canGoNode = canGoNode.concat(nextNode.child)
            } else return sheep
        }
        console.log("canGoNode", canGoNode)
    }
    console.log(sheep, wolf)
}

// const makeOrder = (root) => {
//     const orders = []

//     const preOrder = (array, node) => {
//         if (!node) {
//             // console.log(array)
//             // orders.push(array)
//         } else {
//             let leftArray = [...array.concat(node.no)]
//             let rightArray = [...array.concat(node.no)]
//             preOrder(leftArray, node.child[0])
//             preOrder(leftArray, node.child[1])

//             preOrder(rightArray, node.child[1])
//             preOrder(rightArray, node.child[0])
//         }
//     }
//     preOrder([], root)
//     console.log(orders)
// }

const countAnimals = (node) => {
    let sheepCount = 0
    let wolfCount = 0
    const stack = [...node.child]
    while (stack.length > 0) {
        const current = stack.pop()
        if (current.animal === 0) sheepCount++
        else wolfCount++
        current.child.forEach((c) => stack.push(c))
    }
    return [sheepCount, wolfCount]
}

const test = [
    [
        [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [
            [0, 1],
            [1, 2],
            [1, 4],
            [0, 8],
            [8, 7],
            [9, 10],
            [9, 11],
            [4, 3],
            [6, 5],
            [4, 6],
            [8, 9],
        ],
    ],
    [
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
        [
            [0, 1],
            [0, 2],
            [1, 3],
            [1, 4],
            [2, 5],
            [2, 6],
            [3, 7],
            [4, 8],
            [6, 9],
            [9, 10],
        ],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
