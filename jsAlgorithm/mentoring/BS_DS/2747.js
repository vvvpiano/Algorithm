const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim();
const N = parseInt(input);
let fibonazzi_array = new Array(46);
fibonazzi_array[0] = 0;
fibonazzi_array[1] = 1;

const fibonazzi = n => {
    if (n === 0 || n === 1)
        return n;
    if (fibonazzi_array[n])
        return fibonazzi_array[n];
    let result = fibonazzi(n - 1) + fibonazzi(n - 2);
    fibonazzi_array[n] = result;
    return result;
}

console.log(fibonazzi(N));