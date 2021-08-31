class Node {
    constructor(value) {
        this.value = value
        this.childs = []
        this.count = 1
    }
}

const solution = (words) => {
    const root = new Node("")

    for (let i = 0; i < words.length; i++) {
        makeTrie(words[i], root)
    }

    let answer = 0
    for (let i = 0; i < words.length; i++) {
        answer += findWord(words[i], root)
    }
    return answer
}

const findWord = (word, root) => {
    let i = 0
    let node = root
    while (true) {
        const char = word.charAt(i)
        node = node.childs[char]
        i++
        if (i === word.length || node.count === 1) return i
    }
}

const makeTrie = (word, root) => {
    let i = 0
    let node = root
    while (i < word.length) {
        const current_char = word.charAt(i++)
        if (!node.childs[current_char]) {
            const next_node = new Node(current_char)
            node.childs[current_char] = next_node
            node = next_node
        } else {
            node = node.childs[current_char]
            node.count++
        }
    }
}

const test = [
    ["go", "gone", "guild"],
    ["abc", "def", "ghi", "jklm"],
    ["word", "war", "warrior", "world"],
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(test[i]))
}
