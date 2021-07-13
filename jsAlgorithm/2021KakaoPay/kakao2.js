function solution(rows, columns, swipes) {
    let array = init_array(rows, columns);
    let movesum;
    let answers = [];
    for (let i = 0; i < swipes.length; i++) {
        [array, movesum] = swipe(array, swipes[i], rows, columns);
        answers.push(movesum);
        console.log("i:", i, array, movesum);
    }
    console.log(answers);
}

const swipe = (array, swipe) => {
    let result;
    switch (swipe[0]) {
        case 1:
            result = rowSwap(array, 1, swipe);
            break;
        case 2:
            result = rowSwap(array, 2, swipe);
            break;
        case 3:
            result = colSwap(array, 3, swipe);
            break;
        case 4:
            result = colSwap(array, 4, swipe);
            break;
        default:
            console.log("default")
            break;
    }
    return result;
}

const rowSwap = (array, swipenumber, swipe) => {
    swipe.shift();
    let [r1, c1, r2, c2] = swipe;
    r1--; c1--; r2--; c2--;
    let temp;
    if (swipenumber == 1) { // 아래
        temp = array[r2].slice();
        for (let i = array.length - 1; i >= 0; i--) {
            for (let j = 0; j < array[0].length; j++) {
                if (i == r1 && c1 <= j && j <= c2) 
                    array[i][j] = temp[j];
                if (r1 < i && i <= r2 && c1 <= j && j <= c2)
                    array[i][j] = array[i - 1][j];
            }
        }
    } else { // 위
        temp = array[r1].slice();
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                if (i == r2 && c1 <= j && j <= c2) {
                    array[i][j] = temp[j];
                }
                if (r1 <= i && i < r2 && c1 <= j && j <= c2)
                    array[i][j] = array[i + 1][j];
            }
        }
    }
    let movesum = 0;
    for (let j = c1; j <= c2; j++){
        movesum += temp[j];
    }
    console.log(temp, movesum)
    return [array, movesum];
}
const colSwap = (array, swipenumber, swipe) => {
    swipe.shift();
    let [r1, c1, r2, c2] = swipe;
    r1--; c1--; r2--; c2--;
    let temp;
    let movesum = 0;
    if (swipenumber == 3) { // 오른쪽
        for (let i = r1; i <= r2; i++) {
            temp = array[i][c2];
            for (let j = c2; j >= c1; j--) {
                if (j == c1) {
                    array[i][j] = temp;
                    movesum += temp;
                }
                else
                    array[i][j] = array[i][j - 1];
            }
        }
    } else { // 왼쪽
        for (let i = r1; i <= r2; i++) {
            temp = array[i][c1];
            for (let j = c1; j <= c2; j++) {
                if (j == c2) {
                    array[i][j] = temp;
                    movesum += temp;
                }
                else
                    array[i][j] = array[i][j + 1];
            }
        }
    }
    console.log("movesum", movesum)
    console.log(array)
    return [array, movesum];
}

// const arrReducer = (array) => array.reduce((acc, cur) => acc + cur);
// const rowReducer = (array, rownum) => arrReducer(array[rownum]);
// const colReducer = (array, colnum) => {
//     let col = array.map(e => e[colnum]);
//     return arrReducer(col);
// }

// const cut_array = (array, swipe) => {
//     swipe.shift();
//     let [r1, c1, r2, c2] = swipe;
//     let newarr = array.slice(r1 - 1, r2);
//     newarry = newarr.map(e => e.slice(c1 - 1, c2))
//     return newarr
// }

const init_array = (rows, columns) => {
    let count = 1;
    array2d = [];
    for (let i = 0; i < rows; i++) {
        let arr = [];
        for (let j = 0; j < columns; j++) {
            arr.push(count++);
        }
        array2d.push(arr);
    }
    return array2d;
}

solution(4, 3, [[1,1,2,4,3],[3,2,1,2,3],[4,1,1,4,3],[2,2,1,3,3]])