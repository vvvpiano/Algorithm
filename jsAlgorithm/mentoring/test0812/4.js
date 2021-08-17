class Node {
    constructor(r, c, past_direction = null, cost = null, path) {
        this.r = r;
        this.c = c;
        this.past_direction = past_direction;
        this.cost = cost;
        this.path = path;
    }
}

const solution = (board) => {
    const N = board.length;

    const q = [];
    q.push(new Node(0, 0, -1, -500, ["00"]));

    let min = Number.MAX_SAFE_INTEGER;

    while (q.length > 0) {
        let cur = q.shift();
        if (cur.r === N - 1 && cur.c === N - 1) {
            if (min > cur.cost)
                min = cur.cost;
        }
        for (let i = 0; i < 4; i++) {
            let [n_r, n_c] = get_adjacent_position(cur.r, cur.c, i);
            if (is_in_range(n_r, n_c, N) && board[n_r][n_c] === 0 && !cur.path.includes([n_r, n_c].join(""))) {
                let cost = cur.cost + 100;
                if (cur.past_direction != i)
                    cost += 500;
                q.push(new Node(n_r, n_c, i, cost, [...cur.path, [n_r, n_c].join("")]));
            }
        }
    }

    return min;
 }

const get_adjacent_position = (i, j, direction) => {
    let direction_info = [
        [i, j - 1], //  0, left
        [i, j + 1], // 1, right
        [i - 1, j], // 2, up
        [i + 1, j] // 3, down
    ]
    return direction_info[direction];
}

const is_in_range = (i, j, N) => {
    if (i < 0 || i >= N)
        return false;
    if (j < 0 || j >= N)
        return false;
    return true;
}

// let board = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]];
// let board = [[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]];
let board = [[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]];
// let board = [[0,0,0],[0,0,0],[0,0,0]];
console.log(solution(board));