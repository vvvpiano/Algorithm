const solution = (n, t, m, p) => {
    let numberString = ""
    let i = 0
    while (numberString.length < t * m) numberString += convert(i++, n)
    let answer = ""
    i = 0
    while (i < t) answer += numberString.charAt(i++ * m + p - 1)
    return answer
}

const convert = (number, base) => {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
    let converted_number = []
    if (number === 0) return 0
    while (number > 0) {
        converted_number.push(digits[number % base])
        number = Math.floor(number / base)
    }
    return converted_number.reverse().join("")
}

const test = [
    [2, 4, 2, 1],
    [16, 16, 2, 1],
    [16, 16, 2, 2],
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(...test[i]))
}
