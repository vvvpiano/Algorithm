const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
let [cur_r, cur_c, direction] = input.shift().split(' ').map(Number);
const Map = input.map(line => line.split(' ').map(Number));

const solution = (Map, cur_r, cur_c, direction) => {
    while (true) {
        if (Map[cur_r][cur_c] === 0)
            Map[cur_r][cur_c] = 2; // 청소한 칸은 2로 표시
        if (!move_next(Map, cur_r, cur_c, direction))
            break;
        [cur_r, cur_c, direction] = move_next(Map, cur_r, cur_c, direction);
    }
    return count_cleaned(Map);
}

const look_direction = (Map, cur_r, cur_c, direction) => {
    switch (direction) {
        case 0:
            return [Map[cur_r - 1][cur_c], cur_r - 1, cur_c];
        case 1:
            return [Map[cur_r][cur_c + 1], cur_r, cur_c + 1];
        case 2:
            return [Map[cur_r + 1][cur_c], cur_r + 1, cur_c];
        case 3:
            return [Map[cur_r][cur_c - 1], cur_r, cur_c - 1];
        default:
            break;
    }
}

const move_next = (Map, cur_r, cur_c, direction) => { // 메뉴얼 2
    for (let i = 0; i < 4; i++) { // 메뉴얼 2.b
        direction = (direction - 1 + 4) % 4;
        let [value, left_r, left_c] = look_direction(Map, cur_r, cur_c, direction);
        if (value === 0) // 메뉴얼 2.a
            return [left_r, left_c, direction];
    }
    let back_direction = (direction + 2) % 4;
    let [value, back_r, back_c] = look_direction(Map, cur_r, cur_c, back_direction);
    if (value !== 1) // 메뉴얼 2.c
        return [back_r, back_c, direction];
    return null; // 메뉴얼 2.d
}

const count_cleaned = (Map) => {
    let count = 0;
    for (let i = 0; i < Map.length; i++)
        for (let j = 0; j < Map[i].length; j++) 
            if (Map[i][j] === 2)
                count++;
        
    return count;
}

console.log(solution(Map, cur_r, cur_c, direction));