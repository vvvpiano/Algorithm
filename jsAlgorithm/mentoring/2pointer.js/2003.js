const fs = require("fs");
const input = fs.readFileSync("../../test.txt").toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const A = input.shift().split(" ").map(Number);
// console.log(N, M, A)

const solution = (N, M, A) => {
    if (N === 1) {
        if (A[0] === M)
            return 1;
        return 0;
    }

    let p1 = 0;
    let p2 = 1;
    let count = 0;
    let sum = A[p1] + A[p2];
    while (p2 < N) {
        // console.log("p1:", p1, "p2:", p2, "sum:", sum);
        if (sum === M) {
            count++;
        }
        if (sum >= M) {
            sum -= A[p1];
            p1++;
        } else { // sum < M
            p2++;
            sum += A[p2];
        }
    }
    return count;
}

console.log(solution(N, M, A));