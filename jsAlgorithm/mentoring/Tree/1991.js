const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());

class Node {
    constructor(value) {
        this.value = value;
        this.left_child = null;
        this.right_child = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    find = (value) => {
        let q = [];
        q.push(this.root);
        while (q.length > 0) {
            let node = q.shift();
            if (node.value == value)
                return node;
            if (node.left_child)
                q.push(node.left_child);
            if (node.right_child)
                q.push(node.right_child);
        }
        return -1;
    }
}

const solution = (N, input) => {
    let BT = new BinaryTree();
    BT.root = new Node('A');
    for (let i = 0; i < N; i++) {
        let [mid, left, right] = input[i].split(' ');
        let node = BT.find(mid);
        if (left != '.') {
            node.left_child = new Node(left);
        }
        if (right != '.') {
            node.right_child = new Node(right);
        }
    }

    let preorder_str = "";
    const preorder = (root) => {
        if (!root)
            return;
        preorder_str += root.value;
        preorder(root.left_child);
        preorder(root.right_child);
    }
    preorder(BT.root);
    console.log(preorder_str);

    let midorder_str = "";
    const midorder = (root) => {
        if (!root)
            return;
        midorder(root.left_child);
        midorder_str += root.value;
        midorder(root.right_child);
    }
    midorder(BT.root);
    console.log(midorder_str);

    let postorder_str = "";
    const postorder = (root) => {
        if (!root)
            return;
        postorder(root.left_child);
        postorder(root.right_child);
        postorder_str += root.value;
    }
    postorder(BT.root);
    console.log(postorder_str);
}

solution(N, input);