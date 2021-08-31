const solution = (price, money, count) => {
    const cost = getCount(count) * price
    if (cost < money) return 0
    return cost - money
}

const getCount = (count) => {
    let sum = 0
    for (let i = 1; i <= count; i++) {
        sum += i
    }
    return sum
}

console.log(solution(3, 20, 4))
