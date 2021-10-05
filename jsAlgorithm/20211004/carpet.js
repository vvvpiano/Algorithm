const solution = (brown, yellow) => {
    const width_x_height = brown + yellow
    let width = 3
    let height
    while (true) {
        if (width_x_height % width === 0) {
            height = width_x_height / width
            if (2 * (width + height) - 4 === brown && width * height - 2 * (width + height) + 4 === yellow) break
        }
        width++
    }
    const answer = width >= height ? [width, height] : [height, width]
    return answer
}

const test = [
    [10, 2],
    [8, 1],
    [24, 24],
]

test.forEach((t) => console.log("answer:", solution(...t)))
