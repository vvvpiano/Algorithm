const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
let T = input.shift();

const solution = (T, input) => {
    for (let i = 0; i < T; i++) {
        if (is_correct(input.shift()))
            console.log("YES");
        else
            console.log("NO");
    }
}

const is_correct = str => {
    let stack = [];
    let i = 0;
    while (i < str.length) {
        let char = str.charAt(i++);
        if (char === '(')
            stack.push(char);
        else { // char === ')'
            if (!stack.pop())
                return false;
        }
    }
    if (stack.length === 0)
        return true;
    return false;
}

solution(T, input);