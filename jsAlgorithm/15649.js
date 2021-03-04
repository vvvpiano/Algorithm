const fs = require('fs');
const input = fs.readFileSync('./test.txt').toString().trim().split(' ');
const N = parseInt(input[0])
const M = parseInt(input[1])

let combination = [];
let array = [];

function findComb(array) {
    if (array.length === M) 
        combination.push(array);

    for (let i = 1; i <= N; i++) {
        if (!array.includes(i))
            findComb(array.concat([i]));
    }
}


findComb(array, 1)
combination = combination.map(comb => comb.join(' '))
console.log(combination.join('\n'));