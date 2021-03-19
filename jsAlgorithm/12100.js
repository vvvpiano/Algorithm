const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
let map = input.map(e => e.split(' ').map(Number));

let max = -1;
solution();

function solution() {
    recursion(map, 0);
    console.log(max);
}

function recursion(map, count, move) {
    if (count >= 5) {
        if (max < findMax(map))
            max = findMax(map);
            return;
    }

    recursion(moveHorizontal(map, 0), count + 1, "left");
    recursion(moveHorizontal(map, 1), count + 1, "right");
    recursion(moveVertical(map, 0), count + 1, "up");
    recursion(moveVertical(map, 1), count + 1, "down");
}

function moveHorizontal(map, direction) {
    return map.map(row => moveHorizontalLine(row, direction));
}

function moveVertical(map, direction) {
    let movedMap = transposeMatrix(map);
    movedMap = moveHorizontal(movedMap, direction);
    return transposeMatrix(movedMap);
}

function moveHorizontalLine(array, direction) {
    let no0Array = array.filter(e => e !== 0);
    let newArray = [];
    let next = 1;
    let i = 0;
    if (direction === 1) {
        next = -1;
        i = no0Array.length - 1;
    }

    let count = no0Array.length;
    while (count > 0) {
        if (count - 1 > 0 && no0Array[i] === no0Array[i + next]) {
            newArray.push(no0Array[i] * 2);
            i += next * 2;
            count -= 2;
            continue;
        }
        newArray.push(no0Array[i]);
        i += next;
        count--;
    }

    let zeros = new Array(array.length - newArray.length).fill(0);
    if (direction === 1)
        newArray = zeros.concat(newArray.reverse());
    else
        newArray = newArray.concat(zeros);
    
    return newArray;
}

function transposeMatrix(map) {
    transpose = [];
    for (let j = 0; j < map.length; j++) {
        let array = map.map(row => row[j]);
        transpose.push(array);
    }
    return transpose;
}

function printMap(map) {
    for (let i = 0; i < map.length; i++) {
        console.log(map[i].join(' '));
    }
    console.log()
}

function findMax(map) {
    let maxs = map.map(row => Math.max(...row));
    return Math.max(...maxs);
}