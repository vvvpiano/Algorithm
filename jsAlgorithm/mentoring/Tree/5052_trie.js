const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim().split("\n");
let t = parseInt(input.shift());

class Node {
    constructor(value = '') {
        this.value = value;
        this.children = {};
        this.is_leaf = false; // 이 노드에서 끝나는 단어가 있는지 여부
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert = (string) => {
        let curent_node = this.root;
        for (let i = 0; i < string.length; i++) {
            // console.log("current value:", curent_node.value);
            const char = string.charAt(i);
            if (curent_node.children[char] && curent_node.children[char].is_leaf)
                return false;
            if (curent_node.children[char] === undefined)
                curent_node.children[char] = new Node(curent_node.value + char);
            curent_node = curent_node.children[char];
        }
        curent_node.is_leaf = true;
        return true;
    }
}

const solution = (t, input) => {
    for (let i = 0; i < t; i++) {
        const n = input.shift();
        let phone_numbers = input.splice(0, n).sort((a, b) => a.length - b.length);
        is_all_diff(phone_numbers);
    }
}

const is_all_diff = (numbers) => {
    let trie = new Trie();
    for (let i = 0; i < numbers.length; i++) {
        if (!trie.insert(numbers[i])) {
            console.log("NO");
            return;
        }
    }
    console.log("YES");
}

solution(t, input);