const solution = (n, k) => {
    const convertedNumber = convertBase(n, k)
    const numbers = convertedNumber.split("0").map(Number)
    let count = 0
    numbers.forEach((n) => {
        if (isPrime(n)) count++
    })
    return count
}

const isPrime = (n) => {
    if (n === 1) return false
    if (n === 2 || n === 3) return true
    if (n % 2 === 0) return false
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false
    }
    return true
}

const convertBase = (number, base) => {
    let str = ""
    while (number > 0) {
        str += number % base
        number = Math.floor(number / base)
    }
    const convertedNumber = [...str].reverse().join("")
    return convertedNumber
}

const test = [
    [437674, 3],
    [110011, 10],
]

test.forEach((t) => console.log("answer:", solution(...t)))
