const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const T = parseInt(input.shift());

const solution = (information) => {
    const N = parseInt(information.shift());
    let root_array = new Array(N + 1);
    for (let i = 0; i < N + 1; i++) {
        root_array[i] = {
            root: i,
            distance: 0
        };
    }

    const find_root = (number, acc = 0) => {
        if (root_array[number].root === number) {
            return [number, acc];
        }
        let next = root_array[number].root;
        acc += root_array[number].distance;
        return find_root(next, acc);
    }

    const union_root = (i, j) => {
        let [A, dist_A] = find_root(i);
        let [B, dist_B] = find_root(j);
        root_array[i].root = A;
        root_array[i].distance = dist_A;
        root_array[j].root = B;
        root_array[j].distance = dist_B;

        root_array[A].root = B;
        root_array[A].distance = Math.abs(A - B) % 1000;
    }
    
    let result = "";
    let command = information.shift();
    while (command != 'O') {
        let content = command.split(' ');
        if (content[0] === 'E') {
            let [root, distance] = find_root(parseInt(content[1]));
            root_array[content[1]].root = root;
            root_array[content[1]].distance = distance;
            result += distance + '\n';
        } else { // content[0] === 'I'
            union_root(parseInt(content[1]), parseInt(content[2]));
        }
        command = information.shift();
    }
    return result.trim();
}

for (let i = 0; i < T; i++) {
    let eof_index = input.indexOf('O');
    const information = input.splice(0, eof_index + 1);
    console.log(solution(information));
}