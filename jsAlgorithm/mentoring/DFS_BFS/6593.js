
const fs = require('fs');
const input = fs.readFileSync("../../test.txt").toString().trim().split('\n');

class Node {
    constructor(l, r, c, level) {
        this.l = l;
        this.r = r;
        this.c = c;
        this.level = level;
    }

    get_position() {
        return [this.l, this.r, this.c]
    }
}

const solution = (L, R, C, building) => {

    const is_visited = [];
    let start_point;
    for (let i = 0; i < L; i++) {
        const floor = [];
        for (let j = 0; j < R; j++) {
            const row = new Array(C).fill(0);
            floor.push(row);
            for (let k = 0; k < C; k++) {
                if (building[i][j][k] === 'S')
                    start_point = [i, j, k];
            }
        }
        is_visited.push(floor);
    }

    const q = [];
    let level = 0;
    q.push(new Node(...start_point, level));
    let [l, r, c] = start_point;
    is_visited[l][r][c] = 1;
    
    while (q.length > 0) {
        let cur = q.shift();

        [l, r, c] = cur.get_position();
        if (building[l][r][c] === 'E')
            return `Escaped in ${cur.level} minute(s).`
        
        for (let i = 0; i < 6; i++) {
            const next = get_next_positon(...cur.get_position(), i);
            const [n_l, n_r, n_c] = next;
            if (is_in_range(next, L, R, C) && building[n_l][n_r][n_c] !== '#' && is_visited[n_l][n_r][n_c] === 0) {
                q.push(new Node(...next, cur.level + 1));
                is_visited[n_l][n_r][n_c] = 1;
            }
        }
    }
    return "Trapped!";

}

const get_next_positon = (l, r, c, direction) => {
    const next = [
        [l, r, c + 1], // 동
        [l, r, c - 1], // 서
        [l, r + 1, c], // 남
        [l, r - 1, c], // 북
        [l + 1, r, c], // 하
        [l - 1, r, c], // 상
    ]
    return next[direction];
}

const is_in_range = (position, L, R, C) => {
    let [l, r, c] = position;
    if (l < 0 || l >= L)
        return false;
    if (r < 0 || r >= R)
        return false;
    if (c < 0 || c >= C)
        return false;
    return true;
}

while (true) {
    const [L, R, C] = input.shift().split(' ').map(Number);
    if (L === 0 && R === 0 && C === 0)
        break;
    
    let building = [];
    for (let i = 0; i < L; i++) {
        let floor_info = input.splice(0, R);
        floor_info = floor_info.map(line => [...line]);
        building.push(floor_info);
        input.shift();
    }
    console.log(solution(L, R, C, building));
}