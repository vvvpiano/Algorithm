const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim().split("\n");
let t = parseInt(input.shift());

const solution = (t, input) => {
    for (let i = 0; i < t; i++) {
        const n = input.shift();
        let phone_numbers = input.splice(0, n).sort((a, b) => a.length - b.length);
        is_all_diff(phone_numbers);
    }
}

const is_all_diff = (numbers) => {
    for (let i = 0; i < numbers.length - 1; i++) {
        let needle = numbers[i];
        for (let j = i + 1; j < numbers.length; j++) {
            let hay = numbers[j];
            if (hay.includes(needle)) {
                console.log("NO");
                return;
            }
        }
    }
    console.log("YES")
}

solution(t, input);