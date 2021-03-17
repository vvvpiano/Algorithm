function binarySearch(array, key, start, end) {
    console.log("parameter", array, key, start, end);
    if (start > end)
        return end; // 다른 문제는 -1을 리턴
        
    let mid = Math.floor((start + end) / 2);
    if (key === array[mid]) {
        return mid
    }
    else if (key < array[mid]) 
        return binarySearch(array, key, start, mid - 1);
    else (key > array[mid]) 
        return binarySearch(array, key, mid + 1, end);
}

let array = [0, 1, 2, 3, 4, 5];
console.log(binarySearch(array, 0, 0, array.length));
console.log(binarySearch(array, 1, 0, array.length));
console.log(binarySearch(array, 2, 0, array.length));
console.log(binarySearch(array, 3, 0, array.length));
console.log(binarySearch(array, 4, 0, array.length));
console.log(binarySearch(array, 5, 0, array.length));
