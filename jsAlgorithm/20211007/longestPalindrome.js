function solution(s) {
    let answer = 0
    for (let i = 0; i < s.length; i++) {
        for (let j = 1; j <= s.length - i; j++) {
            const result = isPalindrom(s, i, j)
            if (result && answer < j) answer = j
        }
        if (answer === s.length - i) break
    }

    return answer
}

const isPalindrom = (str, start, length) => {
    for (let i = 0; i < length / 2; i++) {
        if (str[start + i] !== str[start + length - 1 - i]) return false
    }
    return true
}
