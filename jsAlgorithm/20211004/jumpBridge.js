const solution = (distance, rocks, n) => {
    rocks = rocks.sort((a, b) => a - b)
    rocks = [0, ...rocks, distance]
    const intervals = []
    for (let i = 0; i < rocks.length - 1; i++) {
        intervals[i] = rocks[i + 1] - rocks[i]
    }

    let low = 0
    let high = distance
    let mid, answer
    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        if (canBeMin(mid, [...intervals], n)) {
            console.log("can be min true!!!")
            answer = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    console.log("answer:", answer)
    return answer
}

const canBeMin = (number, intervals, n) => {
    console.log("number:", number)
    let merge_count = 0
    let number_i = intervals.indexOf(number)
    if (number_i < 0) {
        const [min_count, range] = canMakeNumber(number, intervals)
        console.log("mincount", min_count)
        if (!min_count) return false
        merge_count += min_count
        intervals.splice(range[0], range[1] - range[0] + 1)
        intervals.splice(range[0], 0, number)
        number_i = range[0]
    }
    console.log(intervals)
    intervals.splice(number_i, 1)
    let number_left_intervals = intervals.slice(0, number_i)
    let number_right_intervals = intervals.slice(number_i)

    console.log(number_left_intervals, number_right_intervals)
    let result = remove_smaller(number_left_intervals, number)
    console.log("result remove left smaller:", result)
    if (result < 0) return false
    merge_count += result
    result = remove_smaller(number_right_intervals, number)
    console.log("result remove right smaller:", result)
    if (result < 0) return false
    merge_count += result

    console.log("merge_count:", merge_count)
    if (merge_count > n) return false // number가 intervals에서 최솟값이 되도록 만들기 위한 병합 횟수가 n보다 많으면 실패

    while (true) {
        console.log("merging left")
        console.log(merge_count)
        if (merge_count === n) return true
        if (number_left_intervals.length === 1) break
        combine(number_left_intervals, findMinIndex(number_left_intervals)[1])
        merge_count++
    }
    while (true) {
        console.log("merging right", merge_count)
        console.log(number_right_intervals)
        if (merge_count === n) return true
        if (number_right_intervals.length === 1) break
        combine(number_right_intervals, findMinIndex(number_right_intervals)[1])
        merge_count++
    }
    return false
}

const remove_smaller = (part_intervals, number) => {
    if (part_intervals.length === 0) return 0
    let combine_count = 0
    while (true) {
        const [min, min_i] = findMinIndex(part_intervals)
        if (min >= number) return combine_count
        if (part_intervals.length === 1) return -1 // 아무리 합쳐도 number보다 작은 수가 남아있을 때
        combine(part_intervals, min_i)
        combine_count++
    }
}

const combine = (intervals, min_i) => {
    const left_min = intervals[min_i - 1]
    const right_min = intervals[min_i + 1]
    let combine_index
    if (min_i - 1 < 0) combine_index = min_i
    else if (min_i + 1 === intervals.length) combine_index = min_i - 1
    else {
        // 더 작은 쪽을 선택해서 조금이라도 작은 값을 우선적으로 없애기
        combine_index = left_min <= right_min ? min_i - 1 : min_i
    }

    intervals[combine_index] += intervals[combine_index + 1]
    intervals.splice(combine_index + 1, 1)
}

const canMakeNumber = (number, intervals) => {
    let min_count = Number.MAX_SAFE_INTEGER
    let range
    for (let i = 0; i < intervals.length; i++) {
        let sum = intervals[i]
        let count = 0
        for (let j = i + 1; j < intervals.length; j++) {
            sum += intervals[j]
            count++
            if (sum > number) break
            if (sum === number) {
                if (min_count > count) {
                    min_count = count
                    range = [i, j]
                }
            }
        }
    }
    if (min_count === Number.MAX_SAFE_INTEGER) return [null, null]
    return [min_count, range]
}

const findMinIndex = (intervals) => {
    let min = Number.MAX_SAFE_INTEGER
    let min_i
    for (let i = 0; i < intervals.length; i++) {
        if (intervals[i] < min) {
            min = intervals[i]
            min_i = i
        }
    }
    return [min, min_i]
}

console.log(solution(25, [2, 14, 11, 21, 17], 3))
