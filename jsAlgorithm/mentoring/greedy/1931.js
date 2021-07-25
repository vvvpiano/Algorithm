const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const N = input.shift();
const time = input.map(e => e.split(' ').map(Number)).sort((a, b) => {
    if (a[1] !== b[1])
        return a[1] - b[1];
    else
        return a[0] - b[1];
})

const solution = (time) => {
    let count = 1;
    let last = time[0];
    for (let i = 1; i < time.length; i++) {
        if (last[1] <= time[i][0]) {
            count++;
            last = time[i];
        }
    }
    return count;
}

console.log(solution(time));