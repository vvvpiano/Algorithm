const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
const dice = input.map(e => e.split(' ').map(Number));

const pairIndex = [5, 3, 4, 1, 2, 0];
let bottomIndexListPerCase = [];
let bottomPlustop = [];

for (let i = 0; i < 6; i++) {
    bottomPlustop[i] = getBottomTopsum(i);
}
// console.log(bottomIndexListPerCase);
// console.log(bottomPlustop);
const sums = [];
for (let i = 0; i < 6; i++) {
    let bottomIndexList = bottomIndexListPerCase[i];
    let sum = 0;
    for (let j = 0; j < N; j++) {
        let downsideIndex = bottomIndexList[j];
        let upsideIndex = getOppositeSide(downsideIndex);
        let tempDice = dice[j].slice();
        tempDice[downsideIndex] = -1;
        tempDice[upsideIndex] = -1;
        sum += Math.max(...tempDice);
    }
    sums.push(sum);
}

console.log(Math.max(...sums));

function getBottomTopsum (bottomIndex) {
    let sum = 0;
    let index = bottomIndex;
    let bottomIndexList = [];
    for (let i = 0; i < N; i++) {
        bottomIndexList.push(index);
        let bottomValue = dice[i][index];
        let upValue = dice[i][getOppositeSide(index)];
        sum += bottomValue + upValue
        if (i < N - 1)
            index = dice[i + 1].indexOf(upValue);
    }
    bottomIndexListPerCase.push(bottomIndexList);
    return sum;
}

function getOppositeSide(side) {
    return pairIndex[side];
}