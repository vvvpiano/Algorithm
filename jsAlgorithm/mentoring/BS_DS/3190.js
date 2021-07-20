const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const n_of_apples = parseInt(input.shift());
const apples = input.splice(0, n_of_apples).map(e => e.split(' ').map(Number));
const n_of_directions = parseInt(input.shift());
const directions = {};
for (let i = 0; i < input.length; i++) {
    let [second, direction] = input[i].split(' ');
    directions[second] = direction;
}

const solution = (N, apples, directions) => {
    let snake = [[1, 1]];
    let seconds = 0;
    let direction = 'E';

    while (true) {
        let old_head = snake[snake.length - 1];
        let new_head = get_next_head(old_head, direction);
        snake.push(new_head); // 먼저 뱀은 몸길이를 늘려 머리를 다음 칸에 위치시킨다.
        seconds++;
        if (is_game_end(snake, N))
            break;
        if (find_2d_array(new_head, apples) >= 0) // 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는움직이지  않는다.
            apples.splice(find_2d_array(new_head, apples), 1);
        else 
            snake.shift(); // 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다.
        if (directions[seconds]) // 게임시간으로부터 X초가 끝난 뒤에 방향 전환을 한다.
            direction = rotate(direction, directions[seconds]);
        // console.log(snake, "direction:", direction, "second:", seconds, "apples:", apples)
    }
    return seconds;
}

const is_game_end = (snake, N) => {
    const head = snake.pop();;
    const [row, col] = head;
    // 뱀이 벽에 부딪히면 게임 끝
    if (!(0 < row && row <= N))
        return true;
    if (!(0 < col && col <= N))
        return true; 
    // 뱀이 자기 몸에 부딪히면 게임 끝
    if (find_2d_array(head, snake) >= 0)
        return true;
    snake.push(head);
    return false;
}

const get_next_head = (old_head, direction) => {
    let [row, col] = old_head;
    switch (direction) {
        case 'E':
            return [row, col + 1];
        case 'S':
            return [row + 1, col];
        case 'W':
            return [row, col - 1];
        case 'N':
            return [row - 1, col];
        default:
            break;
    }
}

const rotate = (current_dir, C) => {
    let directions = ['E', 'S', 'W', 'N'];
    let cur_index = directions.indexOf(current_dir);
    if (C === 'D')
        return directions[(cur_index + 1) % 4];
    else
        return directions[(cur_index - 1 + 4) % 4];
}

const find_2d_array = (head, apples) => {
    const [row, col] = head;
    for (let i = 0; i < apples.length; i++) {
        const [a_r, a_c] = apples[i];
        if (row === a_r && col === a_c)
            return i;
    }
    return -1;
}

console.log(solution(N, apples, directions))