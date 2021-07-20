const fs = require('fs');
let input = fs.readFileSync("../.././test.txt").toString().trim().split('\n');
const [K, N] = input.shift().split(' ').map(Number);
const lengths = input.map(Number);

const solution = (K, N, lengths) => {
    let cut_length = binary_search(K, N, lengths);
    return cut_length;
}

const binary_search = (K, N, lengths) => {
    const max_cut_length = Math.floor(lengths.reduce((acc, cur) => acc + cur) / K);
    let start = 1, end = max_cut_length;
    let mid, LANs;
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        LANs = calculate_LANs(mid, lengths);
        if (LANs >= N)
            start = mid + 1;
        else if (LANs < N)
            end = mid - 1;
    }
    return end;
}

const calculate_LANs = (cut_length, lengths) => {
    sum = 0;
    for (let i = 0; i < lengths.length; i++)
        sum += Math.floor(lengths[i] / cut_length);
    return sum;
}

console.log(solution(K, N, lengths));