const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim();

const solution = n => {
    for (let i = 1; i <= n; i++) {
        if (isConstructor(n, i))
            return i;
    }
    return 0;
}

const isConstructor = (n, i) => {
    let sum = i;
    while (i > 0) {
        sum += i % 10;
        i = Math.floor(i/10);
    }
    return n === sum;
}

console.log(solution(parseInt(input)));