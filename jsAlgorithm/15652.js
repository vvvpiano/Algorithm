const fs = require('fs');
const input = fs.readFileSync('./test.txt').toString().trim().split(' ');
const N = parseInt(input[0])
const M = parseInt(input[1])

let combination = [];
let array = [];

function findComb(array, start) {
    if (array.length === M) {
        combination.push(array);
        return;
    }
    
    for (let i = start; i <= N; i++) {
        findComb(array.concat([i]), i)
    }
}


findComb(array, 1)
combination = combination.map(comb => comb.join(' '))
console.log(combination.join('\n'));