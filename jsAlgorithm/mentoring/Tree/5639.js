const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim();

class Node {
    constructor(value) {
        this.value = value;
        this.left_child = null;
        this.right_child = null;
    }
    insert = (node) => {
        if (this.value > node.value) {
            if (this.left_child)
                this.left_child.insert(node);
            else
                this.left_child = node;
        }
        else {
            if (this.right_child)
                this.right_child.insert(node);
            else
                this.right_child = node;
        }
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert = (node) => {
        if (this.root === null)
            this.root = node;
        else
            this.root.insert(node);
    }
}

const solution = (input) => {
    if (input.length <= 0)
        return;
    input = input.split("\n").map(Number);
    let binary_tree = new BinaryTree();
    for (let i = 0; i < input.length; i++) {
        binary_tree.insert(new Node(input[i]));
    }
    let answer = "";

    const post_order = (node) => {
        if (node.left_child)
            post_order(node.left_child);
        if (node.right_child)
            post_order(node.right_child);
        answer += node.value + "\n";
    }
    post_order(binary_tree.root);
    console.log(answer.trim());
}

solution(input);