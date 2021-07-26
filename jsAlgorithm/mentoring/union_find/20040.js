const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(" ").map(Number);
const draw = input.map(line => line.split(" ").map(Number));
// console.log(N, M, draw)

const solution = (N, M, draw) => {
    let root_array = new Array(N);
    for (let i = 0; i < N; i++) {
        root_array[i] = i;
    }

    for (let i = 0; i < M; i++) {
        let [n1, n2] = draw[i];
        if (find_root(n1, root_array) === find_root(n2, root_array)) {
            return (i + 1);
        }
        root_array = union(n1, n2, root_array);
    }
    return 0;
}

const find_root = (number, array) => {
    if (array[number] == number)
        return number;
    return find_root(array[number], array);
}

const union = (n1, n2, array) => {
    let root_1 = find_root(n1, array);
    let root_2 = find_root(n2, array);
    
    if (root_1 < root_2) {
        array[root_2] = root_1;
    } else {
        array[root_1] = root_2;
    }
    return array;
}

console.log(solution(N, M, draw));