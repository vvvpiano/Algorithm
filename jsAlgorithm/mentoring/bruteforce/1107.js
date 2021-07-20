const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const target = parseInt(input.shift());
const disable_count = parseInt(input.shift());
const disables = disable_count === 0 ? [] : input[0].split(' ').map(Number);

const solution = (target, disables) => {
    if (99 <= target && target <= 102) // 경유가 필요없는 예외경우
        return count = Math.abs(100 - target);

    let min = 9999999;
    // 현재 100번인 상태에서 i번으로 갔다가 target채널로 가기까지 필요한 모든 횟수를 구함. 
    // 단 disables가 포함된 i는 어차피 근처의 번호로 +, -를 통해 이동 후 target채널로 가므로 생각하지 않고 거른다.
    for (let i = 0; i < 1000000; i++) {
        if (includes_disables(i, disables) && i !== 100)
            continue;
        let count;
        if (99 <= i && i <= 102)
            count = Math.abs(100 - i);
        else
            count = i.toString().length;
        count += Math.abs(target - i);
        // min = Math.min(min, count);
        if (min > count) {
            console.log(i, count);
            min = count;
        }
    }
    // if (min === 9999999)
    //     min = Math.abs(target - 100);
    return min;
}

const includes_disables = (number, disables) => {
    const number_string = number.toString();
    for (let i = 0; i < number_string.length; i++) {
        if (disables.includes(parseInt(number_string.charAt(i))))
            return true;
    }
    return false;
}

console.log(solution(target, disables));