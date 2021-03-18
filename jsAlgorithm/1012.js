const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const CASE = parseInt(input.shift());

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function createMap(nodes, M, N) {
    const map = new Array(M).fill(0).map(r => r = new Array(N).fill(0));
    for (let i = 0; i < nodes.length; i++) {
        const [x, y] = nodes[i];
        map[x][y] = 1;
    }
    return (map)
}

for (let i = 0; i < CASE; i++) {
    const [M, N, cabbage] = input.shift().split(' ').map(Number);
    const nodes = [];
    for (let j = 0; j < cabbage; j++) 
        nodes.push(input.shift().split(' ').map(Number));
    const map = createMap(nodes, M, N);

    function bfs (x, y) {
        let queue = [];
        queue.push([x, y]);
        map[x][y] = 0;
        
        while (queue.length > 0) {
            let [curX, curY] = queue.shift();
            for (let k = 0; k < 4; k++) {
                let newX = curX + dx[k];
                let newY = curY + dy[k];
                
                if (newX < 0 || newX >= M || newY < 0 || newY >= N)
                    continue;
                if (map[newX][newY] === 0)
                    continue;
                if (map[newX][newY] === 1) {
                    map[newX][newY] = 0; // mark as visited;
                    queue.push([newX, newY]);
                }
            }
        }
    }
    let count = 0;
    
    for (let a = 0; a < map.length; a++) {
        for (let b = 0; b < map[a].length; b++) {
            if (map[a][b] != 0) {
                bfs(a, b);
                count++;
            }
        }
    }
    
    console.log(count);
}