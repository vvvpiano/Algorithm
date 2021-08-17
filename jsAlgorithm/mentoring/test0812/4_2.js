class Node {
    constructor(r, c, past_direction = null, cost = null) {
        this.r = r;
        this.c = c;
        this.past_direction = past_direction;
        this.cost = cost;
    }
}

const solution = (board) => {
    const N = board.length;

    const is_visited = [];
    for (let i = 0; i < N; i++) {
        is_visited.push(new Array(N).fill(0));
    }

    const q = [];
    is_visited[0][0] = 0;
    q.push(new Node(0, 0, '', 0)); // 첫번째 direction을 ''으로 정한 이유 1) 숫자연산을 가능하게 하기 위해서 2) 첫 디렉션으로서 0과 구분해주기 위해서

    const directions = [0, 1, 3];
    while (q.length > 0) {
        let cur = q.shift();
        if (is_visited[cur.r][cur.c] >= cur.cost || is_visited[cur.r][cur.c] === 0) {
            is_visited[cur.r][cur.c] = cur.cost;

            directions.forEach(i => {
                const next_direction = (cur.past_direction + i) % 4;
                let [n_r, n_c] = get_adjacent_position(cur.r, cur.c, next_direction);

                if (is_in_range(n_r, n_c, N) && board[n_r][n_c] === 0) {
                    let cost = (i === 0 || cur.past_direction === '') ? cur.cost + 100 : cur.cost + 600;
                    q.push(new Node(n_r, n_c, next_direction, cost));   
                }
            });
        }
    }

    return is_visited[N-1][N-1];
 }

const get_adjacent_position = (i, j, direction) => {
    let direction_info = [
        [i, j + 1], //  0, right
        [i + 1, j], // 1, down
        [i, j - 1], // 2, left
        [i - 1, j] // 3, up
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
// let board = [[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]];
let board = [[0,0,0],[0,0,0],[0,0,0]];
console.log(solution(board));