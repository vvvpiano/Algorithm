const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
let N = parseInt(input.shift());
let M = parseInt(input.shift())
let networks = input.map(line => line.split(" ").map(Number));

const solution = (N, networks) => {
    if (N === 0 || N === 1)
        return 0;
    let root_computer = new Array(N + 1);
    for (let i = 0; i < root_computer.length; i++) {
        root_computer[i] = i;
    }

    const find_root = number => {
        if (root_computer[number] === number)
            return number;
        else
            return find_root(root_computer[number]);
    }

    const union = (n1, n2) => {
        let root_1 = find_root(n1);
        let root_2 = find_root(n2);
        if (root_1 === root_2)
            return;
        if (root_1 < root_2) {
            root_computer[root_2] = root_1;
        } else {
            root_computer[root_1] = root_2;
        }
    }

    for (let i = 0; i < M; i++) {
        let [c1, c2] = networks[i];
        union(c1, c2);
    }

    let count = 0;
    for (let i = 0; i < root_computer.length; i++) {
        if (find_root(i) === 1)
            count++;
    }
    return count - 1;
}

console.log(solution(N, networks));