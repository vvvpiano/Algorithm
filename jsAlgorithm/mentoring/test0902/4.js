function solution(food_times, k) {
    const [turn, seconds] = binarySearch(food_times, k)
    const foodAfterTurns = food_times.map((food) => (food > turn ? food - turn : 0))
    let remainSeconds = k - seconds
    let i = 0
    let answer
    for (let count = 0; count < remainSeconds + 1; count++) {
        while (foodAfterTurns[i] === 0) i++
        if (i >= food_times.length) return -1
        answer = i
        i++
    }
    return answer + 1
}

const binarySearch = (food_times, k) => {
    let low = 0
    let high = 100000000
    let mid, answer, answerSeconds, seconds
    while (low <= high) {
        // mid회전 했을 때 k초보다 덜 지났으면 탐색범위를 높은 값으로 좁힘
        mid = Math.floor((low + high) / 2)
        seconds = getPastSeconds(food_times, mid)
        if (seconds <= k) {
            answer = mid
            answerSeconds = seconds
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return [answer, answerSeconds]
}

const getPastSeconds = (food_times, turn) => {
    let seconds = 0
    food_times.forEach((food) => {
        let second = food >= turn ? turn : food
        seconds += second
    })
    return seconds
}

for (let i = 1; i <= 20; i++) {
    console.log(i, "=====answer:", solution([5, 1, 6, 3, 2], i))
}
