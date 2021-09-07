const solution = (s) => {
    let minLength = s.length
    for (let i = 1; i <= Math.floor(s.length / 2); i++) {
        const compressedString = compress(s, i)
        if (minLength > compressedString.length) minLength = compressedString.length
    }
    return minLength
}

const compress = (s, unit) => {
    let arr = splitWithLength(s, unit)
    let compressedString = ""
    let i = 0
    while (i < arr.length) {
        let count = 1
        while (arr[i] === arr[i + count]) {
            count++
        }
        if (count === 1) {
            compressedString += arr[i]
            i++
        } else {
            compressedString += count + arr[i]
            i += count
        }
    }
    return compressedString
}

const splitWithLength = (s, unit) => {
    let array = []
    let i = 0
    while (i < s.length) {
        array.push(s.substr(i, unit))
        i += unit
    }
    return array
}

const test = ["aabbaccc", "ababcdcdababcdcd", "abcabcdede", "abcabcabcabcdededededede", "xababcdcdababcdcd"]

test.forEach((s) => console.log("answer:", solution(s)))
