const solution = (p) => {
    if (p.length === 0 || isRight(p)) return p
    return correct(p)
}

const correct = (w) => {
    if (w.length === 0) return w
    const [u, v] = splitP(w)
    if (isRight(u)) {
        return u + correct(v)
    } else {
        let correctedString = "("
        correctedString += correct(v) + ")"
        correctedString += reverseParenthesis(u.slice(1, u.length - 1))
        return correctedString
    }
}

const splitP = (p) => {
    let u = ""
    let count = 0
    let i = 0
    while (i < p.length) {
        if (u.length > 0 && count === 0) break
        else {
            u += p.charAt(i)
            if (p.charAt(i) === "(") count++
            else if (p.charAt(i) === ")") count--
        }
        i++
    }
    const v = p.slice(i, p.length)
    return [u, v]
}

const isBalanced = (s) => {
    let count = 0
    let i = 0
    while (i < s.length) {
        if (s.charAt(i) === "(") count++
        else if (s.charAt(i) === ")") count--
    }
    if (count === 0) return true
    return false
}

const isRight = (s) => {
    // 문자열은 이미 균형잡혀있음
    const stack = []
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === "(") {
            stack.push("(")
        } else if (s.charAt(i) === ")") {
            const open = stack.pop()
            if (!open) return false
        }
    }
    if (stack.length !== 0) return false
    return true
}

const reverseParenthesis = (s) => {
    let reversed = ""
    let i = 0
    while (i < s.length) {
        if (s.charAt(i) === "(") reversed += ")"
        else if (s.charAt(i) === ")") reversed += "("
        i++
    }
    return reversed
}

const test = ["(()())()", ")(", "()))((()"]

test.forEach((t) => console.log("answer:", solution(t)))
