const fs = require('fs')
let coins = fs.readFileSync('./test.txt').toString().trim().split('\n');
let [kinds, result] = coins.shift().split(' ');

function getMinCoins() {
    coins = coins.reverse();
    let count = 0;
    for (let i = 0; i < kinds; i++) {
        if (result < parseInt(coins[i])) 
            continue;
        count += Math.floor(result / coins[i]);
        result = result % coins[i];
        if (result === 0)
            return count;
    }
}

console.log(getMinCoins())