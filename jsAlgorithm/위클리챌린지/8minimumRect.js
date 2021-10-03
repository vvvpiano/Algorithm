const solution = (sizes) => {
    let max_width = 0
    let max_height = 0
    for (let i = 0; i < sizes.length; i++) {
        sizes[i].sort((a, b) => b - a)
        if (max_width < sizes[i][0]) max_width = sizes[i][0]
        if (max_height < sizes[i][1]) max_height = sizes[i][1]
    }
    return max_width * max_height
}

const test = [
    [
        [60, 50],
        [30, 70],
        [60, 30],
        [80, 40],
    ],
    [
        [10, 7],
        [12, 3],
        [8, 15],
        [14, 7],
        [5, 15],
    ],
    [
        [14, 4],
        [19, 6],
        [6, 16],
        [18, 7],
        [7, 11],
    ],
]

test.forEach((t) => console.log("answer: ", solution(t)))
