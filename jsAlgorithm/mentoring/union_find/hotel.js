const solution = (k, room_number) => {
    let available_rooms = new Array(k + 1);
    let answer = [];

    for (let i = 0; i < k + 1; i++) {
        available_rooms[i] = i;
    }
    // console.log(available_rooms)

    const find_available = number => {
        if (available_rooms[number] === number)
            return number;
        return find_available(available_rooms[number]);
    }

    for (let i = 0; i < room_number.length; i++) {
        let available_number = find_available(room_number[i]);
        answer.push(available_number);
        available_rooms[available_number] = find_available(available_number + 1);
        available_rooms[room_number[i]] = available_rooms[available_number];
        // console.log(available_rooms)
    }

    return answer;
}

// console.log(solution(Math.pow(10, 12), [1,3,4,1,3,1]))
console.log(Math.pow(10,12))