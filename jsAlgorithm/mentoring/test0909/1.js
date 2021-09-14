const solution = (new_id) => {
    let id = step1(new_id)
    id = step2(id)
    id = step3(id)
    id = step4(id)
    id = step5(id)
    id = step6(id)
    id = step7(id)
    return id
}

const step1 = (new_id) => {
    return new_id.toLowerCase()
}

const step2 = (new_id) => {
    let str = ""
    let i = 0
    while (i < new_id.length) {
        const char = new_id.charAt(i)
        if ("a" <= char && char <= "z") str += char
        else if ("0" <= char && char <= "9") str += char
        else if (char === "-" || char === "_" || char === ".") str += char
        i++
    }
    return str
}

const step3 = (new_id) => {
    let str = ""
    let i = 0
    while (i < new_id.length) {
        str += new_id.charAt(i)
        if (new_id.charAt(i) === ".") {
            while (new_id.charAt(i) === ".") i++
        } else i++
    }
    return str
}

const step4 = (new_id) => {
    if (new_id.charAt(0) === ".") new_id = new_id.substr(1, new_id.length)
    if (new_id.charAt(new_id.length - 1) === ".") new_id = new_id.substr(0, new_id.length - 1)
    return new_id
}

const step5 = (new_id) => {
    if (new_id.length === 0) return "a"
    return new_id
}

const step6 = (new_id) => {
    let str = new_id
    if (str.length >= 16) {
        str = str.substr(0, 15)
        if (str.charAt(14) === ".") str = str.substr(0, 14)
    }
    return str
}

const step7 = (new_id) => {
    if (new_id.length > 2) return new_id
    const lastChar = new_id.charAt(new_id.length - 1)
    while (new_id.length < 3) {
        new_id += lastChar
    }
    return new_id
}

const test = ["...!@BaT#*..y.abcdefghijklm", "z-+.^.", "=.=", "123_.def", "abcdefghijklmn.p"]

test.forEach((t) => console.log("answer:", solution(t)))
