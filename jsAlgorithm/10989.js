const fs = require('fs')
const input = fs.readFileSync('./test.txt').toString().trim().split('\n')
const N = input.shift()
const length = Math.max(...input);

// 카운팅정렬 알고리즘
let count = Array.from({length}, () => 0)
input.forEach(e => {
   count[e]++; 
});

for (let i = 1; i < count.length ; i++) {
    count[i] += count[i - 1]
}

let aux = new Array(N);
for (let i = input.length - 1 ; i >= 0 ; i--) {
    aux[--count[input[i]]] = input[i]
}

console.log(aux.join('\n'))