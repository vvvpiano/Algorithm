const solution = (m, n, board) => {
    board = board.map(line => line.split(""));
    console.log(board);
    let answer = 0;
    let remove_count;
    while (true) {
        [remove_count, board] = remove_blocks(m, n, board);
        // console.log("removed: ", remove_count);
        // console.log(board)
        if (remove_count === 0)
            return answer;
        answer += remove_count;
    }
}

const remove_blocks = (m, n, board) => {
    let remove_mark = [];
    for (let i = 0; i < m; i++)
        remove_mark.push(new Array(n).fill(0));

    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
            let current = board[i][j];
            if (current === 0)
                continue;
            let right = board[i+1][j];
            let bottom = board[i][j+1];
            let r_bottom = board[i+1][j+1];
            if (current === right && current === bottom && current === r_bottom) {
                remove_mark[i][j] = 1;
                remove_mark[i+1][j] = 1;
                remove_mark[i][j+1] = 1;
                remove_mark[i+1][j+1] = 1;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (remove_mark[i][j] === 1)
                board[i][j] = 0;
        }
    }
    let remove_count = remove_mark.reduce((acc, cur) => acc + cur.filter(e => e === 1).length, 0);
    board = blocks_down(m, n, board);
    return [remove_count, board];
}

const blocks_down = (m, n, board) => {
    for (let i = 0; i < n; i++) {
        let valid_column = board.map(row => row[i]).filter(e => e !== 0).reverse();
        // console.log(valid_column);
        for (let j = 0; j < m; j++) {
            if (j < valid_column.length)
                board[m - 1 - j][i] = valid_column[j];
            else
                board[m - 1 - j][i] = 0;
        }
    }
    return board;
}

console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));