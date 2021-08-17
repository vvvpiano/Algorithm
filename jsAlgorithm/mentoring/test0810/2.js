const solution = (n, arr1, arr2) => {
    arr1 = arr1.map(e => convert_to_binary(n, e));
    arr2 = arr2.map(e => convert_to_binary(n, e));
    // console.log(arr1)
    // console.log(arr2)
    let answer = [];
    for (let i = 0; i < n; i++) {
        answer.push(process_row(arr1[i], arr2[i]));
    }
    console.log(answer);
}

const convert_to_binary = (n, number) => {
    let remains = [];

    while (number > 0) {
        remains.push(number % 2);
        number = Math.floor(number / 2);
    }
    while (remains.length < n)
        remains.push(0);
    
    return remains.reverse();
}

const process_row = (row1, row2) => {
    let row_ans = [];
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] === 0 && row2[i] === 0)
            row_ans[i] = ' ';
        else
            row_ans[i] = '#';
    }
    return row_ans.join('');
}

console.log(solution(6, [46, 33, 33 ,22, 31, 50], [27 ,56, 19, 14, 14, 10]));