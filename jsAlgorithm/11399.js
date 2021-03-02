const fs = require('fs')
const input = fs.readFileSync('./test.txt').toString().trim().split('\n');
const N = input.shift();
let times = input[0].split(' ')

let sum = 0;
times = times.map(e => parseInt(e)).sort((a, b) => a - b);
times.reduce((acc, cur) => {
    sum += acc + cur;
    return acc + cur;
}, 0)
console.log(sum)