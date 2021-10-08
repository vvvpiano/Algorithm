const solution = (n) => {
    const array = []

    let i = 2
    while (true) {
        if (isCorrect(i)) {
            array.push(i)
            if (array[n - 1]) {
                console.log(array)
                return array[n - 1]
            }
        }
        i++
    }
}

const isCorrect = (number) => {
    if (number === 2) return true
    if (number % 2 !== 0) return false

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (tryFromStart(i, number)) return true
    }
    return false
}

const tryFromStart = (start, number) => {
    let divider = start
    while (true) {
        if (number === 1) return true
        if (number % divider !== 0) return false
        number = number / divider++
    }
}

console.log("answer:", solution(50))
