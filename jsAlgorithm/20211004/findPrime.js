const solution = (numbers) => {
    const papers = numbers.split("").map(Number)
    const orders = new Array(numbers.length)
    for (let i = 0; i < numbers.length; i++) {
        orders[i] = i
    }

    let order_combination = []
    for (let i = 1; i <= numbers.length; i++) {
        const comb = makeCombination(orders, i)
        order_combination = [...order_combination, ...comb]
    }

    let all_numbers = order_combination.map((comb) => comb.reduce((acc, cur) => acc * 10 + papers[cur], 0))
    all_numbers = [...new Set(all_numbers)].filter((n) => isPrime(n))
    return all_numbers.length
}

const isPrime = (number) => {
    if (number === 0 || number === 1) return false
    if (number === 2) return true
    if (number % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false
    }
    return true
}

const makeCombination = (orders, count) => {
    const combination = []

    const recursion = (array) => {
        if (array.length === count) {
            combination.push(array)
            return
        }

        for (let i = 0; i < orders.length; i++) {
            if (!array.includes(orders[i])) recursion(array.concat(orders[i]))
        }
    }
    recursion([])
    return combination
}

const test = ["17", "011"]

test.forEach((t) => console.log("answer:", solution(t)))
