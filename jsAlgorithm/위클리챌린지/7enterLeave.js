const solution = (enter, leave) => {
    const answer = new Array(enter.length).fill(0)
    const room = []
    let enter_i = 0
    let leave_i = 0
    while (leave_i < leave.length) {
        if (canOut(room, leave[leave_i])) {
            room.splice(room.indexOf(leave[leave_i]), 1)
            leave_i++
        } else {
            for (let i = 0; i < room.length; i++) {
                answer[room[i] - 1]++
            }
            answer[enter[enter_i] - 1] = room.length
            room.push(enter[enter_i++])
        }
    }
    return answer
}

const canOut = (room, out) => {
    if (room.includes(out)) return true
    return false
}

const test = [
    [
        [1, 3, 2],
        [1, 2, 3],
    ],
    [
        [1, 4, 2, 3],
        [2, 1, 3, 4],
    ],
    [
        [3, 2, 1],
        [2, 1, 3],
    ],
    [
        [3, 2, 1],
        [1, 3, 2],
    ],
    [
        [1, 4, 2, 3],
        [2, 1, 4, 3],
    ],
]

test.forEach((t) => console.log("answer", solution(...t)))
