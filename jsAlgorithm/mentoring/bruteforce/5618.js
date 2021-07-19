const fs = require('fs');
const input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);

// 이건 시간초과

// const solution = numbers => {
//     const gcd = calculate_gcd(numbers);
//     print_cd(gcd);
// }

// const calculate_gcd = numbers => { // gcd = greatest common denominator
//     const min = Math.min(...numbers);
//     for (let i = min; i > 1; i--) {
//         let remain = numbers.map(e => e % i);
//         let remainSum = remain.reduce((acc, cur) => acc + cur);
//         if (remainSum === 0)
//             return i;
//     }
//     return 1;
// }

// const print_cd = gcd => { // cd = common denominator
//     for (let i = 1; i <= gcd; i++) {
//         if (gcd % i === 0)
//             console.log(i);
//     }
// }

const solution = numbers => {
    const min = Math.min(...numbers)
    for (let i = 1; i <= min; i++) {
        if (is_denominator(numbers, i))
            console.log(i);
    }
}

const is_denominator = (numbers, deno) => {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % deno != 0)
            return false;
    }
    return true;
}

solution(numbers);