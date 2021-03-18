const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

const map = input.map(row => row.split('').map(Number));
let queue = [];
let dx = [0, 0, -1 ,1];
let dy = [-1, 1, 0, 0]; // dx dy 합쳐서 남, 북, 서, 동 방향

function bfs(x, y) {
    // 가장 처음 시작 노드를 큐에 넣어준다.
    queue.push([x, y]);

    while (queue.length > 0) {
        let [x, y] = queue.shift();

        for (let i = 0; i < 4; i++) {
            nextX = x + dx[i];
            nextY = y + dy[i];
            //  map공간 벗어난 경우 무시
            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M)
                continue;
            // 갈 수 있는 공간이 아닌 경우(0) 무시
            if (map[nextX][nextY] == 0)
                continue;
            // 해당 노드를 처음 방문하는 경우에만 최단거리 기록
            if (map[nextX][nextY] == 1) {
                map[nextX][nextY] += map[x][y];
                queue.push([nextX, nextY]);
            }
        }
    }
    return map[N-1][M-1];
}

console.log(bfs(0, 0));