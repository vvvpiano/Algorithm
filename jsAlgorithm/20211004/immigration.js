const solution = (n, times) => {
    let low = 0
    let high = Number.MAX_SAFE_INTEGER
    let mid, answer
    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        if (canFinishInDue(mid, n, times)) {
            answer = mid
            high = mid - 1
        } else {
            low = mid + 1
        }
    }
    return answer
}

const canFinishInDue = (due_time, n, times) => {
    for (let i = 0; i < times.length; i++) {
        n -= Math.floor(due_time / times[i])
    }
    if (n <= 0) return true
    return false
}

solution(6, [7, 10])
