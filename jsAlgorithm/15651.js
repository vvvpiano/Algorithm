const fs = require('fs');
const input = fs.readFileSync('./test.txt').toString().trim().split(' ');
const N = parseInt(input[0])
const M = parseInt(input[1])

let combination = [];
let array = [];

function findComb(array) {
    if (array.length === M) {
        combination.push(array);
        return;
    }
    
    for (let i = 1; i <= N; i++) {
        findComb(array.concat([i]))
    }
}


findComb(array)
combination = combination.map(comb => comb.join(' '))
console.log(combination.join('\n'));