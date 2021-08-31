function solution(n, k, cmd) {
    let rows = [];
    let current = k;
    let stack = [];
    let answer = [];
    
    for (let i = 0; i < n; i++) { // 100만번
        rows[i] = i;
        answer[i] = 'O';
    }

    for (let i = 0; i < cmd.length; i++) { // 20만번
        let [command, count] = cmd[i].split(" ");
        if (command == 'U') {
            current -= parseInt(count);
        }
        if (command == 'D') {
            current += parseInt(count);
        }
        if (command == 'C') {
            answer[rows[current]] = 'X';
            stack.push(rows[current]);

            let remove = rows[current];
            rows = rows.filter(row => row !== remove);

            if (current > rows.length - 1)
                current--;
        }
        if (command == 'Z') {
            console.log("rows:" ,rows)
            let value = rows[current];
            let recover = stack.pop();
            answer[recover] = 'O'
            console.log("current:", value, "recover:", recover)
            let i = findIndex(recover, rows);
            // let i = 0;
            // while (rows[i] < recover)
            //     i++;

            console.log("insert index:", i)
            rows.splice(i, 0, recover);
            current = rows.indexOf(value);
        }
        console.log(answer.join(''))
    }

    return answer.join('');
}

const findIndex = (insert_value, rows) => {
    let low = 0;
    let high = rows.length - 1;

    let mid, index;
    while (low <= high) {
        console.log("low, high:", low, high)
        mid = Math.floor((low + high) / 2);
        if (insert_value < rows[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low;
}

// let cmd = ["D 2","C","U 3","C","D 4","C","U 2","Z","Z"];
let cmd = ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"];
console.log(solution(8, 2, cmd));

/*

cmd에 있는 모든숫자를 합해도 100만이 되지 않는다는 말?
=> k 포인터
포인터를 위아래로 움직여도 100만이 되지 않는다는 말이고
이 말은 데이터를 잘 저장해두고 ++나 --를 통해 답을 찾아가라

링크드리스트로 이분탐색을하면 안됨 list[n]을 찾아올 때 n이 걸림
그냥 리스트였다면 list[n]의 삽입삭제 할 때 n만큼 시간이 걸림

*/