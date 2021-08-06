const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const graph = input.map(line => line.split(" ").map(Number));
// console.log(N, graph)

const solution = (N, graph) => {
    let answer = [];
    for (let i = 0; i < N; i++) {
        answer.push(new Array(N).fill(0));
    }
    
    for (let i = 0; i < N; i++) {
        let q = [];
        q.push(i);

        while (q.length > 0) {
            let v = q.pop();
            for (let j = 0; j < N; j++) {
                let next_v = graph[v][j];
                if (answer[i][j] === 0 && graph[v][j] === 1) {
                    answer[i][j] = 1;
                    q.push(j);
                }
            }
        }
    }
    answer = answer.map(row => row.join(" "));
    answer = answer.join("\n");
    console.log(answer);
}

solution(N, graph);