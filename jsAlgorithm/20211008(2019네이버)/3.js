class Task {
    constructor(no, duration) {
        this.no = no
        this.duration = duration
        this.pre_task = []
    }
}

const solution = (cook_times, order, k) => {
    const tasks = []
    cook_times.forEach((time, i) => (tasks[i + 1] = new Task(i + 1, time)))
    order.forEach(([pre, post]) => {
        tasks[post].pre_task.push(pre)
    })
    console.log(tasks)

    const is_visited = new Array(cook_times.length + 1).fill(0)
    const getDuration = (no) => {
        const task = tasks[no]
        if (task.pre_task.length === 0) return task.duration

        const durations = task.pre_task.map((pre) => {
            is_visited[pre] = 1
            return getDuration(pre)
        })
        let max = 0
        for (let i = 0; i < durations.length; i++) {
            if (durations[i] > max) max = durations[i]
        }
        return task.duration + max
    }

    const total_time = getDuration(k)
    const answer = [is_visited.filter((e) => e === 1).length, total_time]
    return answer
}

const test = [
    [
        [5, 30, 15, 30, 35, 20, 4],
        [
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
            [1, 6],
            [4, 6],
            [5, 6],
            [6, 7],
        ],
        6,
    ],
    [
        [5, 30, 15, 30, 35, 20, 4, 50, 40],
        [
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
            [1, 6],
            [4, 6],
            [5, 6],
            [6, 7],
            [8, 9],
        ],
        9,
    ],
    [
        [5, 3, 2],
        [
            [1, 2],
            [2, 3],
            [1, 3],
        ],
        3,
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
