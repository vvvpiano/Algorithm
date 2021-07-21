const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const Map = input.map(line => line.split("").map(Number));

class Cell {
    constructor(row, col, level) {
        this.row = row;
        this.col = col;
        this.level = level;
    }

    get_properties = () => {
        return [this.row, this.col, this.level];
    }
}

const solution = (N, M, Map) => {
    let min = 99999;
    const visited = [];
    for (let i = 0; i < N + 1; i++)
        visited.push(new Array(M + 1).fill(0));
    
    const queue = [];
    queue.push(new Cell(1, 1, 1));
    visited[1][1] = 1;

    while (queue.length > 0) {
        const [cur_row, cur_col, cur_level] = queue.shift().get_properties();
        if (cur_row === N && cur_col === M)
            min = Math.min(min, cur_level);
        for (let i = 0; i < 4; i++) {
            let [new_row, new_col] = get_adjacent_position(cur_row, cur_col, i);
            if (isInMap(new_row, new_col, N, M) && Map[new_row - 1][new_col - 1] === 1 && visited[new_row][new_col] === 0) {
                queue.push(new Cell(new_row, new_col, cur_level + 1));
                visited[new_row][new_col] = 1;
            }
        }
    }
    return min;
}

const get_adjacent_position = (row, col, direction) => {
    const row_move = [-1, 0, 1, 0]; // N, E, S, W
    const col_move = [0, 1, 0, -1];
    return [row + row_move[direction], col + col_move[direction]];
}

const isInMap = (row, col, N, M) => {
    if (!(0 < row && row <= N))
        return false;
    if (!(0 < col && col <= M))
        return false;
    return true;
}

console.log(solution(N, M, Map));