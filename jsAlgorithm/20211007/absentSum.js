function solution(numbers) {
    let sum = (9 * (9 + 1)) / 2
    numbers.forEach((n) => (sum -= n))
    return sum
}
