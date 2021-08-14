const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const board = input.map(line => line.split(' ').map(Number));

const solution = (N, board) => {
    const dp = [];
    for (let i = 0; i < N; i++) {
        dp.push(new Array(N).fill(0));
    }

    dp[0][0] = 1;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (dp[i][j] === 0 || (i === N - 1 && j === N - 1))
                continue;

            let dist = board[i][j];
            let down = dist + i;
            let right = dist + j;

            if (down < N)
                dp[down][j] += dp[i][j];
            if (right < N)
                dp[i][right] += dp[i][j];
            
        }
    }

    return dp[N-1][N-1];
}

console.log(solution(N, board));