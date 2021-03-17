const fs = require('fs');
const input = fs.readFileSync("./test.txt").toString().trim().split('\n');
const N = parseInt(input.shift());
let arr = input[0].split(' ');
arr = arr.map(e => parseInt(e));
// console.log(arr)

let increaseArr = [0];

function binarySearch(array, key, start, end) {
    // console.log("parameter", array, key, start, end);
    if (start > end)
        return start; // 다른 문제는 -1을 리턴
        
    let mid = Math.floor((start + end) / 2);
    if (key == array[mid]) 
        return mid
    else if (key < array[mid]) 
        return binarySearch(array, key, start, mid - 1);
    else if (key > array[mid]) 
        return binarySearch(array, key, mid + 1, end);
}

for (let i = 0; i < arr.length; i++) {
    // console.log(increaseArr)
    let cur = arr[i];
    if (cur > increaseArr[increaseArr.length-1])
        increaseArr.push(cur);
    else {
        let replaceIndex = binarySearch(increaseArr, cur, 0, increaseArr.length - 1);
        // console.log("replaceIndex", replaceIndex)
        increaseArr[replaceIndex] = cur;
    }
}

console.log(increaseArr.length - 1); // 해답 출력
