const solution = (n, k, cmd) => {
    const answer = new Array(n).fill('O');

    const stack = [];
    let pointer= k;
    let n_of_row = n;

    for (let i = 0; i < cmd.length; i++) { // 20만번 사용
        const command = cmd[i];
        switch (command.charAt(0)) {
            case 'D':
                pointer = find_downer_index(pointer, parseInt(command.split(' ')[1]), answer);
                break;
            case 'U':
                pointer = find_upper_index(pointer, parseInt(command.split(' ')[1]), answer);
                break;
            case 'C':
                let past_pointer = pointer;

                pointer = find_downer_index(past_pointer, 1, answer);
                if (pointer === undefined) // (pointer === n - 1), 아래에 남은 인덱스 없으면
                    pointer = find_upper_index(past_pointer, 1, answer);
                answer[past_pointer] = 'X';
                stack.push(past_pointer);
                break;
            case 'Z':
                let id = stack.pop();
                answer[id] = 'O';
                break;
            default:
                break;
        }
    }
    return answer.join('');
}

const find_downer_index = (pointer, down, array) => {
    let low = pointer;
    let high = array.length - 1;

    let mid, index;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (count_O(pointer, mid, array) - 1 >= down) {
            index = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return index;
}

const find_upper_index = (pointer, up, array) => {
    let low = 0;
    let high = pointer;

    let mid, index;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (count_O(mid, pointer, array) - 1 >= up) {
            index = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return index;
}

const count_O = (start, end, array) => {
    let count = 0;
    for (let i = start; i <= end; i++) {
        if (array[i] === 'O')
            count++;
    }
    return count;
}
const test = [
    [8, 2, ["D 2","C","U 3","C","D 4","C","U 2","Z","Z"]],
    [8, 2, ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"]],
    [8, 2, ["C","C","C","C","C","C","C"]]
]

for (let i = 0; i < test.length; i++) {
    console.log("========test", i, "=========");
    console.log(solution(...test[i]));
}