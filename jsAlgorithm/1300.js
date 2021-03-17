const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const N = parseInt(input[0]);
const k = parseInt(input[1]);

const countUnderNumber = (number) => {
    let cnt = 0;
    for (let i = 1; i <= N; i++) {
        cnt += Math.min(Math.floor(number/i), N);
    }
    return cnt;
}

let left = 1, right = k;
let ans;
while(left <= right) {
    let mid = Math.floor((left + right) / 2);
    let cnt = countUnderNumber(mid);
    if (cnt >= k) {
        right = mid - 1;
        ans = mid;
    } else {
        left = mid + 1;
    }
}

console.log(ans);