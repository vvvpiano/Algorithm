class Node {
    constructor(no, weight) {
        this.no = no
        this.weight = weight
    }
}

function solution(n, s, a, b, fares) {
    const neighbors = new Array(n + 1)
    for (let i = 0; i < neighbors.length; i++) {
        neighbors[i] = []
    }
    fares.forEach((fare) => {
        neighbors[fare[0]].push(new Node(fare[1], fare[2]))
        neighbors[fare[1]].push(new Node(fare[0], fare[2]))
    })

    const results = dijkstra(s, n, neighbors)
    const weightsA = dijkstra(a, n, neighbors)
    const weightsB = dijkstra(b, n, neighbors)
    for (let i = 1; i < results.length; i++) {
        results[i] = results[i] + weightsA[i] + weightsB[i]
    }
    results.sort((a, b) => a - b)
    return results[0]
}

const dijkstra = (startNodeNo, size, neighbors) => {
    const weights = new Array(size + 1).fill(Number.MAX_SAFE_INTEGER)
    const isVisited = new Array(size + 1).fill(false)

    const pq = []
    weights[startNodeNo] = 0
    pq.push(new Node(startNodeNo, 0))
    while (pq.length > 0) {
        const node = pq.sort((a, b) => a.weight - b.weight).shift()
        if (isVisited[node.no]) continue
        isVisited[node.no] = true
        neighbors[node.no].forEach((neighborNode) => {
            if (weights[neighborNode.no] > weights[node.no] + neighborNode.weight) {
                weights[neighborNode.no] = weights[node.no] + neighborNode.weight
                pq.push(new Node(neighborNode.no, weights[neighborNode.no]))
            }
        })
    }
    return weights
}

const fares = [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
]
console.log("answer:", solution(6, 4, 6, 2, fares))
