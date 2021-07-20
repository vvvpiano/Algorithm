const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const tree_heights = input.shift().split(' ').map(Number).sort((a, b) => a - b);

const solution = (N, M, tree_heights) => {
    let start = 0, end = tree_heights[N - 1];
    let mid, cut_part;

    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        cut_part = cut_tree(mid, tree_heights);
        if (cut_part >= M)
            start = mid + 1;
        else 
            end = mid - 1;
    }
    return end;
}

const cut_tree = (height, tree_heights) => {
    let sum = 0;
    for (let i = 0; i < tree_heights.length; i++) {
        let diff = tree_heights[i] - height;
        if (diff > 0)
            sum += diff;
    }
    return sum;
}

console.log(solution(N, M, tree_heights))
