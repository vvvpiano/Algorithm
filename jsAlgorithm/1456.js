const fs = require('fs')
const input = fs.readFileSync("./test.txt").toString() // /dev/stdin

function isEndNo(number) {
    const end_sequence = '666'
    if (number.toString().includes(end_sequence))
        return true;
    return false;
}

function findNextEndNo(number) {
    while (true) {
        if (isEndNo(++number))
            break;
    }
    return number;
}

function findNthEndNo(n) {
    let count = 0;
    let end_no = 0 // first end_no
    while (count++ < n) {
        end_no = findNextEndNo(end_no);
    }
    return end_no;
}

console.log(findNthEndNo(input))