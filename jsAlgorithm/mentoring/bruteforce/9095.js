const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
input = input.map(Number);
const CASE = input.shift();

const solution = (n) => {
    let count = 0;

    const recursion = (sum, n) => {
        if (sum === n) 
            count++;
        if (sum > n)
            return;
        for (let i = 1; i <= 3; i++) {
            recursion(sum + i, n);
        }
    }

    recursion(0, n);
    return count;
}

for (let i = 0; i < CASE; i++) {
    console.log(solution(input[i]))
}