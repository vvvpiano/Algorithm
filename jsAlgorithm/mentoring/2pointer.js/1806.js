const fs = require("fs");
const input = fs.readFileSync("../../test.txt").toString().trim().split("\n");
const [N, S] = input.shift().split(" ").map(Number);
const numbers = input.shift().split(" ").map(Number);

const solution = (N, S, numbers) => {
    let min_length = N;
    let p1 = 0;
    let p2 = 1;
    let sum = numbers[p1] + numbers[p2];
    while (p2 < N) {
        if (sum >= S) {
            if (min_length > p2 - p1) {
                min_length = p2 - p1;
            }
            sum -= numbers[p1];
            p1++;
        } else {
            p2++;
            if (p2 === N)
                break;
            sum += numbers[p2];
        }
    }
    if (min_length === N && sum < S)
        return 0;
    return min_length + 1;
}

console.log(solution(N, S, numbers));