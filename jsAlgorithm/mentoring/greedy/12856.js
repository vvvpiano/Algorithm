let fs = require('fs');
let input = fs.readFileSync('../../test.txt').toString().split('\n');
let N = input.shift();
input = input.toString().split(' ').map(Number).sort((a,b) => {
    return a-b
})
console.log(input)

const solution = (input) => {
    let total = 0
    input.forEach((ele,i) => {
        total += ele * (input.length - i)
    })
    return total
}


console.log(solution(input));