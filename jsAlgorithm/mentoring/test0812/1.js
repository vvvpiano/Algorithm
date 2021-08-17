const solution = (numbers, hand) => {
    hand = hand == 'left' ? "L" : "R";
    let answer = "";
    let cur_left = '*';
    let cur_right = '#';
    for (let i = 0; i < numbers.length; i++) {
        let answer_hand = find_fingers(numbers[i], cur_left, cur_right, hand);
        answer += answer_hand;
        if (answer_hand == 'L')
            cur_left = numbers[i];
        else
            cur_right = numbers[i]
    }
    return answer;
}

const find_fingers = (number, left_finger, right_finger, hand) => {
    const left_list = [1, 4, 7];
    const right_list = [3, 6, 9];
    if (left_list.includes(number))
        return "L";
    if (right_list.includes(number))
        return "R";
    let left_distance = get_distance(number, left_finger);
    let right_distance = get_distance(number, right_finger);
    if (left_distance === right_distance)
        return hand;
    if (left_distance < right_distance)
        return "L";
    return "R";
}

const get_distance = (target, current) => {
    const d2 = {'1':1, '2':0, '3':1, '4':2, '5':1, '6':2, '7':3, '8':2, '9':3, '*':4, '0':3, '#':4};
    const d5 = {'1':2, '2':1, '3':2, '4':1, '5':0, '6':1, '7':2, '8':1, '9':2, '*':3, '0':2, '#':3};
    const d8 = {'1':3, '2':2, '3':3, '4':2, '5':1, '6':2, '7':1, '8':0, '9':1, '*':2, '0':1, '#':2};
    const d0 = {'1':4, '2':3, '3':4, '4':3, '5':2, '6':3, '7':2, '8':1, '9':2, '*':1, '0':0, '#':1};

    switch (target) {
        case 2:
            return d2[current];
        case 5:
            return d5[current];
        case 8:
            return d8[current];
        case 0:
            return d0[current];
        default:
            break;
    }
}

let test = [
    [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"],
    [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right"]
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(...test[i]))
}