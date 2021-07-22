const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const times = input.shift().split(" ").map(Number).sort((a, b) => a - b)
const solution = (N, times) => {
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += times[i] * (N - i);
    }
    return sum
}

console.log(solution(N, times))