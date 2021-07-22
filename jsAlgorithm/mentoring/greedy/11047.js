const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const [N, K] = input.shift().split(" ").map(Number);
const coins = input.map(Number).sort((a, b) => b - a);

const solution = (N, K, coins) => {
    let answer = 0;
    for (let i = 0; i < N; i++) {
        if (K === 0)
            break;
        let count = Math.floor(K / coins[i]);
        K -= count * coins[i];
        answer += count;
    }
    return answer;
}

console.log(solution(N, K, coins))