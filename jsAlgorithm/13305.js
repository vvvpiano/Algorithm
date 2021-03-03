const fs = require('fs');
const input = fs.readFileSync('./test.txt').toString().trim().split('\n');
const N = parseInt(input.shift());

let distance = input[0].split(' ');
distance = distance.map(d => parseInt(d));
let oilCost = input[1].split(' ').slice(0, N - 1); // 마지막 도시의 기름가격은 고려하지 않음
oilCost = oilCost.map(c => parseInt(c));

function sum(array) {
    return array.reduce((acc, cur) => acc + cur, 0);
}

let minCost = 0;
while (distance.length > 0) {
    const cheapestCity = oilCost.indexOf(Math.min(...oilCost));
    const distancesAfterCheapestCity = distance.slice(cheapestCity);
    minCost += sum(distancesAfterCheapestCity) * oilCost[cheapestCity];

    distance = distance.slice(0, cheapestCity);
    oilCost = oilCost.slice(0, cheapestCity);
}

console.log(minCost)