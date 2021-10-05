const solution = (lottos, win_nums) => {
    let match_count = 0
    let not_matched_win_numbers = []
    win_nums.forEach((num) => {
        if (lottos.includes(num)) match_count++
        else not_matched_win_numbers.push(num)
    })
    const num_zero = lottos.filter((lotto) => lotto === 0).length
    const ranks = [6, 6, 5, 4, 3, 2, 1]
    return [ranks[match_count + num_zero], ranks[match_count]]
}

const test = [
    [
        [44, 1, 0, 0, 31, 25],
        [31, 10, 45, 1, 6, 19],
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [38, 19, 20, 40, 15, 25],
    ],
    [
        [45, 4, 35, 20, 3, 9],
        [20, 9, 3, 45, 4, 35],
    ],
]

test.forEach((t) => console.log("answer:", solution(...t)))
