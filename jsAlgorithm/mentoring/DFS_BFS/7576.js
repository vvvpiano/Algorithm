const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const [M, N] = input.shift().split(' ').map(Number);
const box = input.map(e => e.split(" ").map(Number));

class Cell {
    constructor(row, col, level) {
        this.row = row;
        this.col = col;
        this.level = level;
    }

    get_cell() {
        return [this.row, this.col, this.level];
    }
}

const solution = (M, N, box) => {
    let day = 0;
    
    let queue = find_ripe_apple(M, N, box);
    let q_pointer = 0;
    if (!queue)
        return -1;

    while (queue[q_pointer]) {
        let [cur_r, cur_c, cur_level] = queue[q_pointer++].get_cell();
        if (day < cur_level)
            day = cur_level;

        for (let i = 0; i < 4; i++) {
            let [new_r, new_c] = get_adjacent_position(cur_r, cur_c, i);
            if (is_in_box(new_r, new_c, N, M) && box[new_r][new_c] === 0) {
                queue.push(new Cell(new_r, new_c, cur_level + 1));
                box[new_r][new_c] = 1;
            }
        }

    }

    if (find_unripe_apple(M, N, box))
        return -1;
    return day;
}

const find_ripe_apple = (M, N, box) => {
    let ripe_apple_queue = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (box[i][j] === 1)
                ripe_apple_queue.push(new Cell(i, j, 0));
        }
    }
    if (ripe_apple_queue.length > 0)
        return ripe_apple_queue;
    return null;
}

const find_unripe_apple = (M, N, box) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (box[i][j] === 0)
                return [i, j];
        }
    }
    return null;
}

const get_adjacent_position = (row, col, direction) => {
    const row_move = [-1, 0, 1, 0]; // N, E, S, W
    const col_move = [0, 1, 0, -1];
    return [row + row_move[direction], col + col_move[direction]];
}

const is_in_box = (row, col, N, M) => {
    if (!(0 <= row && row < N))
        return false;
    if (!(0 <= col && col < M))
        return false;
    return true;
}

console.log(solution(M, N, box));