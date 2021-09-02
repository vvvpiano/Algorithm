class Node {
    constructor(no, x, y) {
        this.no = no
        this.x = x
        this.y = y
        this.leftChild = null
        this.rightChild = null
        this.lowLimit = null
        this.highLimit = null
    }
}

const solution = (nodeinfo) => {
    const classification = {}
    for (let i = 0; i < nodeinfo.length; i++) {
        const [x, y] = nodeinfo[i]
        if (classification[y]) classification[y].push({ no: i + 1, point: [x, y] })
        else classification[y] = [{ no: i + 1, point: [x, y] }]
    }
    const nodeKeys = Object.keys(classification)
        .map(Number)
        .sort((a, b) => b - a)
    let level = []
    for (let i = 0; i < nodeKeys.length; i++) {
        level[i] = []
        classification[nodeKeys[i]].forEach((info) => {
            level[i].push(new Node(info.no, ...info.point))
        })
    }
    for (let i = 0; i < level.length - 1; i++) {
        for (let j = 0; j < level[i].length; j++) {
            const current = level[i][j]
            const left = findLeftChild(current, level[i + 1])
            const right = findRightChild(current, level[i + 1])
            // console.log("current:", current.no)
            if (left) {
                // console.log("leftchild:", left.no)
                current.leftChild = left
                left.highLimit = current.x
                left.lowLimit = current.lowLimit
            }
            if (right) {
                // console.log("rightchild:", right.no)
                current.rightChild = right
                right.lowLimit = current.x
                right.highLimit = current.highLimit
            }
        }
    }

    const pre = []
    const preorder = (root) => {
        if (!root) return
        pre.push(root.no)
        preorder(root.leftChild)
        preorder(root.rightChild)
    }
    preorder(level[0][0])

    const post = []
    const postorder = (root) => {
        if (!root) return
        postorder(root.leftChild)
        postorder(root.rightChild)
        post.push(root.no)
    }
    postorder(level[0][0])
    return [pre, post]
}

const findLeftChild = (current, nextLevel) => {
    return nextLevel.filter((node) => {
        let isOk = true
        if (current.lowLimit) isOk = isOk && node.x > current.lowLimit
        if (current.highLimit) isOk = isOk && node.x < current.highLimit
        return isOk && node.x < current.x
    })[0]
}

const findRightChild = (current, nextLevel) => {
    return nextLevel.filter((node) => {
        let isOk = true
        if (current.lowLimit) isOk = isOk && node.x > current.lowLimit
        if (current.highLimit) isOk = isOk && node.x < current.highLimit
        return isOk && node.x > current.x
    })[0]
}

const nodeinfo = [
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
]
console.log("answer:", solution(nodeinfo))
