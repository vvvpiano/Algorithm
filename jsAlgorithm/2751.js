const fs = require('fs')
const input = fs.readFileSync('./test.txt').toString().trim().split('\n')
const N = input.shift()
console.log(input.sort((a, b) => a - b).join('\n'))