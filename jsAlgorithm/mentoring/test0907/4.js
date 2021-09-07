class Node {
    constructor(c) {
        this.value = c
        this.children = {}
        this.count = 0
    }
}

const solution = (words, queries) => {
    const Tries = {}
    const ReverseTries = {}
    words.forEach((word) => {
        const size = word.length
        if (!Tries[size]) {
            Tries[size] = new Node("root")
            ReverseTries[size] = new Node("root")
        }
        insert(Tries[size], word)
        insert(ReverseTries[size], [...word].reverse().join(""))
    })
    const answer = []
    queries.forEach((query) => {
        // console.log("=======find", query, "========")
        if (query.charAt(0) !== "?") {
            answer.push(find(Tries[query.length], query))
        } else {
            answer.push(find(ReverseTries[query.length], [...query].reverse().join("")))
        }
    })
    return answer
}

const insert = (root, word) => {
    let current = root
    let i = 0
    while (i < word.length) {
        const char = word.charAt(i)
        current.count++
        if (current.children[char]) {
            current = current.children[char]
        } else {
            current.children[char] = new Node(char)
            current = current.children[char]
        }
        i++
    }
}

const find = (root, query) => {
    if (!root) return 0
    let current = root
    let i = 0
    while (query.charAt(i) !== "?") {
        if (current.children[query.charAt(i)]) current = current.children[query.charAt(i++)]
        else return 0
    }
    return current.count
}

const test = [
    ["frodo", "front", "frost", "frozen", "frame", "kakao"],
    ["fro??", "????o", "fr???", "fro???", "pro?", "??????"],
]

console.log("answer:", solution(...test))
