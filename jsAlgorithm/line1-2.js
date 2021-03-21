function solution(inp_str) {
    var answer = [];
    const rules = [rule1, rule2, rule3, rule4, rule5];
    for (let i = 0; i < rules.length; i++) {
        if (!rules[i](inp_str))
            answer.push(i + 1);
    }
    if (answer.length === 0)
        answer.push(0);
    console.log(answer);
    return answer;
}

function rule1(inp_str) {
    let length = inp_str.length;
    if (8 <= length && length <= 15)
        return true;
    return false;
}

function rule2(inp_str) {
    let chars = [...inp_str];
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i]
        if (isCapital(char) || isLower(char) || isNum(char) || isSpecialChar(char))
            continue;
        else
            return false;
    }
    return true;
}

function rule3(inp_str) {
    let saticefied = new Array(4).fill(false);
    let chars = [...inp_str];
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (isCapital(char))
            saticefied[0] = true;
        else if (isLower(char))
            saticefied[1] = true;
        else if (isNum(char))
            saticefied[2] = true;
        else if (isSpecialChar(char))
            saticefied[3] = true;
    }
    saticefied = saticefied.filter(e => e===true);
    if (saticefied.length >= 3)
        return true;
    return false;
}

function rule4(inp_str) {
    for (let i = 0; i < inp_str.length - 3; i++) {
        let start = inp_str[i];
        let next3 = inp_str.substr(i + 1, 3);
        let dup = start + start + start;
        if (next3 == dup)
            return false;
    }
    return true;
}

function rule5(inp_str) {
    let chars = [...inp_str];
    let counts = {};
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (counts[char])
            counts[char]++;
        else
            counts[char] = 1;
    }
    let keys = Object.keys(counts);
    for (let i = 0; i < keys.length; i++) {
        if (counts[keys[i]] >= 5)
            return false;
    }
    return true;
}

function isCapital(char) {
    return ('A' <= char && char <= 'Z');
}

function isLower(char) {
    return ('a' <= char && char <= 'z');
}

function isNum(char) {
    return ('0' <= char && char <= '9');
}

function isSpecialChar(char) {
    let specialList = [..."~!@#$%^&*"];
    for (let i = 0; i < specialList.length; i++) {
        if (char == specialList[i])
            return true;
    }
    return false;
}

let inp_str = "ZzZz9Z824";
solution(inp_str);