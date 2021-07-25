const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());

const solution = (N, input) => {
    let Map = make_map(N, input)
    let cluster_counts = [];
    while (find_house(Map)) {
        let [row, col] = find_house(Map);
        let queue = [];

        queue.push([row, col]);
        Map[row][col] = 0;
        let house_count = 1;

        while (queue.length > 0) {
            let [cur_r, cur_c] = queue.shift();
            for (let i = 0; i < 4; i++) {
                let [new_r, new_c] = get_adjacent_position(cur_r, cur_c, i);
                if (isInMap(new_r, new_c, N) && Map[new_r][new_c] === 1) {
                    queue.push([new_r, new_c]);
                    Map[new_r][new_c] = 0;
                    house_count++;
                }
            }
        }
        cluster_counts.push(house_count);
    }
    console.log(cluster_counts.length);
    cluster_counts.sort((a, b) => a - b).forEach(e => console.log(e));
}


const make_map = (N, input) => {
    const Map = [];
    Map.push(new Array(N + 2).fill(0));
    for (let i = 0; i < N; i++)
        Map.push([0].concat(input.shift().split("").map(Number)).concat([0]));
    Map.push(new Array(N + 2).fill(0));
    return Map
}

const find_house = Map => {
    for (let i = 0; i < Map.length; i++) {
        for (let j = 0; j < Map[i].length; j++)
            if (Map[i][j] === 1)
                return [i, j];
    }
    return null;
}

const get_adjacent_position = (row, col, direction) => {
    const row_move = [-1, 0, 1, 0]; // N, E, S, W
    const col_move = [0, 1, 0, -1];
    return [row + row_move[direction], col + col_move[direction]];
}

const isInMap = (row, col, N) => {
    if (!(0 <= row && row <= N + 1))
        return false;
    if (!(0 <= col && col <= N + 1))
        return false;
    return true;
}

// const printMap = Map => {
//     for (let i = 0; i < Map.length; i++) {
//         let = "";
//         console.log(Map[i].join());
//     }
// }

solution(N, input)