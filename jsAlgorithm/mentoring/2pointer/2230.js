const fs = require("fs");
const input = fs.readFileSync("../../test.txt").toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const numbers = input.map(Number).sort((a, b) => a - b);
console.log(N, M, numbers)

const solution = (N, M, numbers) => {
    if (N == 1)
        return 0;
    let min_diff = 2000000001; // 차의 최댓값보다 큰 값
    let p1 = 0;
    let p2 = 1;
    while (p2 < N) {
        let diff = numbers[p2] - numbers[p1];
        if (diff === M)
            return M;
        if (diff > M) {
            if (diff < min_diff)
                min_diff = diff;
            p1++;
        } else { // diff < M
            p2++;
        }
    }
    return min_diff;
}

console.log(solution(N, M, numbers));