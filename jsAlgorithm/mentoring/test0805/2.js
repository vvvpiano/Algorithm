const solution = (s) => {
    let set_array = parse_string(s).sort((a, b) => a.length - b.length);
    let answer = set_array[0];
    for (let i = 1; i < set_array.length; i++) {
        for (let j = 0; j < set_array[i].length; j++) {
            if (!answer.includes(set_array[i][j])) {
                answer.push(set_array[i][j]);
                break;
            }
        }
    }
    return answer;
}

const parse_string = (s) => {
    s = s.substr(1, s.length - 1);
    let array = s.split(",{");
    let set_array = [];
    for (let i = 0; i < array.length; i++) {
        let number = 0, j = 0;
        let set = [];
        while (j < array[i].length) {
            if (isNaN(array[i].charAt(j))) {
                if (number !== 0) {
                    set.push(number);
                    number = 0;
                }
            }
            else {
                number = number * 10 + parseInt(array[i].charAt(j))
            }
            j++;
        }
        set_array.push(set);
    }
    return set_array;
}

let arr = [
    "{{2},{2,1},{2,1,3},{2,1,3,4}}",
    "{{1,2,3},{2,1},{1,2,4,3},{2}}",
    "{{20,111},{111}}",
    "{{123}}",
    "{{4,2,3},{3},{2,3,4,1},{2,3}}"
]

for (let i = 0; i < arr.length; i++) {
    console.log(solution(arr[i]));
}