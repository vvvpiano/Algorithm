const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const cards = input.shift().split(" ").map(Number).sort((a, b) => a - b);
const M = parseInt(input.shift());
const numbers = input.shift().split(" ").map(Number);

const solution = (N, cards, M, numbers) => {
    let answer = "";
    for (let i = 0; i < M; i++) {
        if (is_include(N, cards, numbers[i]))
            answer += 1 + " ";
        else
            answer += 0 + " ";
    }
    console.log(answer);
}

const is_include = (N, cards, number) => {
    let low = 0;
    let high = N - 1;
    let mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (cards[mid] === number) {
            return true;
        }
        else if (cards[mid] > number) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return false;
}

solution(N, cards, M, numbers);