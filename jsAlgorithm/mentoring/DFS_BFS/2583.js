const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const [M, N, K] = input.shift().split(" ").map(Number);

const solution = (M, N, K, input) => {
    let grid = [];
    for (let i = 0; i < M; i++) 
        grid.push(new Array(N).fill(0));
    for (let i = 0; i < K; i++)
        grid = fill_square(grid, input.shift());
    // printMap(grid)
    
    let area = [];
    while (true) {
        let start = find_empty_square(grid);
        if (!start)
            break;
        grid[start[0]][start[1]] = 1;
        let queue = [start];
        let square_count = 1;
        while (queue.length > 0) {
            let [cur_r, cur_c] = queue.shift();
            for (let i = 0; i < 4; i++) {
                let [new_r, new_c] = get_adjacent_position(cur_r, cur_c, i);
                if (is_in_grid(new_r, new_c, M, N) && grid[new_r][new_c] === 0) {
                    grid[new_r][new_c] = 1;
                    queue.push([new_r, new_c]);
                    square_count++;
                }
            }
        }
        area.push(square_count);
    }
    console.log(area.length);
    console.log(area.sort((a, b) => a - b).join(' '));

}

// const printMap = Map => {
//     for (let i = 0; i < Map.length; i++) {
//         let = "";
//         console.log(Map[i].join());
//     }
//     console.log("=============")
// }

const fill_square = (grid, square) => {
    const [x1, y1, x2, y2] = square.split(' ').map(Number);
    for (let j = y1; j < y2; j++) {
        for (let i = x1; i < x2; i++)
            grid[j][i] = 1;
    }
    return grid;
}

const find_empty_square = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 0)
                return [row, col];
        }
    }
    return null;
}

const get_adjacent_position = (row, col, direction) => {
    const row_move = [-1, 0, 1, 0]; // N, E, S, W
    const col_move = [0, 1, 0, -1];
    return [row + row_move[direction], col + col_move[direction]];
}

const is_in_grid = (row, col, M, N) => {
    if (!(0 <= row && row < M))
        return false;
    if (!(0 <= col && col < N))
        return false;
    return true;
}

solution(M, N, K, input)