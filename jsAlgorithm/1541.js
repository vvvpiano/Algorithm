const fs = require('fs')
const input = fs.readFileSync('./test.txt').toString().trim();
let numbers = []
let ops = []

const chars = [...input]
let number = "";
for (let i = 0; i < chars.length; i++) {
    if (isNaN(chars[i])) {
        numbers.push(parseInt(number));
        number = "";
        ops.push(chars[i]);
        continue;
    }
    number += chars[i];
    if (i == chars.length - 1)
        numbers.push(parseInt(number));
}

let minsum = numbers.shift()
let index = 0;
while (ops[index] === '+') {
    minsum += numbers[index++];
}

for (let i = index; i < numbers.length; i++){
    minsum -= numbers[i]
}
console.log(minsum)