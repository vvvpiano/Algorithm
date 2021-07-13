function solution(n, k, cmd) {
    let rows = makeRows(n);
    let current = k;
    let stack = [];

    for (let i = 0; i < cmd.length; i++) {
        let [command, count] = cmd[i].split(" ");
        console.log(command, count)
        if (command == 'U') {
            console.log("current: ", current);
            // current = rows.indexOf(current) - parseInt(count);
            current -= parseInt(count);
            console.log("up to ", count, " current: ", current, rows[current]);
        }
        if (command == 'D') {
            console.log("current: ", current);
            // current = rows.indexOf(current) + parseInt(count);
            current += parseInt(count);
            console.log("down to ", count, " current: ", current, rows[current]);
        }
        if (command == 'C') {
            stack.push(rows[current]);
            rows.splice(current, 1);
            console.log("remove ", current, "after:", rows, "current:", current, rows[current]);
            if (current > rows.length - 1)
                current--;
        }
        if (command == 'Z') {
            let value = rows[current];
            let recover = stack.pop();
            let i = 0;
            while (rows[i] < recover)
                i++;
            rows.splice(i, 0, recover);
            current = rows.indexOf(value);
            console.log("after insert:", rows);
        }
    }

    let answer = '';
    for (let i = 0; i < n; i++) {
        if (stack.includes(i))
            answer += 'X';
        else
            answer += 'O';
    }
    return answer;
}

const makeRows = (n) => {
    let rows = [];
    for (let i = 0; i < n; i++) {
        rows.push(i);
    }
    return rows;
}

let cmd = ["D 2","C","U 3","C","D 4","C","U 2","Z","Z","U 1","C"];
console.log(solution(8, 2, cmd));