const fs = require("fs");
const input = fs.readFileSync("../../test.txt").toString().trim().split("\n");
const N = parseInt(input.shift());
const liquids = input.shift().split(' ').map(Number).sort((a, b) => a - b);

const solution = (N, liquids) => {
    let p1 = 0;
    let p2 = N - 1;
    let min_mix = 2000000000; // global_min
    let min_p1, min_p2;
    let mix = Math.abs(liquids[p1] + liquids[p2]); // local_min
    while (p1 < p2) {
        let next_mix = p2 - p1 > 1 ? Math.abs(liquids[p1] + liquids[p2 - 1]) : 2000000000;
        if (next_mix < mix) {
            p2 = p2 - 1;
            mix = next_mix;
        } else {
            if (min_mix > mix) {
                min_mix = mix;
                min_p1 = p1;
                min_p2 = p2;
            }
            p1++;
            mix = Math.abs(liquids[p1] + liquids[p2]);
        }
    } 
    let answer = [liquids[min_p1], liquids[min_p2]];
    return answer.sort((a, b) => a - b).join(' ');
}

console.log(solution(N, liquids));