const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(' ');

const solution = (N, M, input) => {
    const board_list = get_88size(N, M, input);
    let min = 99;
    for (let i = 0; i < board_list.length; i++) {
        let repaint = calculate_repaint(board_list[i]);
        if (min > repaint)
            min = repaint;
    }
    return min;
}

const get_88size = (N, M, input) => {
    let board_list = [];
    for (let i = 0; i <= N - 8; i++) {
        for (let j = 0; j <= M - 8; j++) {
            let board_88 = input.slice(i, i+8).map(row => row.slice(j, j+8));
            board_list.push(board_88);
        }
    }
    return board_list;
}

const calculate_repaint = (board) => {
    const white_start = "WBWBWBWB";
    const black_start = "BWBWBWBW";
    let count = 0;
    let compare_str;
    for (let i = 0; i < board.length; i++) {
        if (i%2 === 0)
            compare_str = white_start;
        else
            compare_str = black_start;
        for (let j = 0; j < 8; j++) {
            if (compare_str.charAt(j) !== board[i].charAt(j))
                count++;
        }
    }
    return count <= 64 / 2 ? count : 64 - count;
}

console.log(solution(N, M, input))