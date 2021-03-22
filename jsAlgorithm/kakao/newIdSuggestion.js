function solution(new_id) {
    let answer;
    answer = step1(new_id);
    answer = step2(answer);
    answer = step3(answer);
    answer = step4(answer);
    answer = step5(answer);
    answer = step6(answer);
    answer = step7(answer);
    return answer;
}

function step1(id) {
    return id.toLowerCase();
}

function step2(id) {
    let chars = [...id];
    let filtered_id = chars.filter(e => isValidChar(e));
    return filtered_id.reduce((acc, cur) => acc + cur, "")
}

function isValidChar(char) {
    if ('a' <= char && char <= 'z')
        return true;
    if (!isNaN(parseInt(char)))
        return true;
    if (char === '-' || char === '_' || char === '.')
        return true;
    return false;
}

function step3(id) {
    let str = "";
    let i = 0;
    while(i < id.length) {
        if (id.charAt(i) === '.') {
            str += id.charAt(i)
            while (id.charAt(i) === '.')
                i++
            continue;
        }
        str += id.charAt(i++);
    }
    return str;
}

function step4(id) {
    if (id.charAt(0) === '.')
        id = id.substr(1, id.length);
    if (id.charAt(id.length - 1) === '.')
        id = id.substr(0, id.length - 1);
    return id;
}

function step5(id) {
    if (id.length === 0)
        id += "a";
    return id;
}

function step6(id) {
    if (id.length >= 16)
        id = id.substr(0, 15);
    id = step4(id);
    return id;
}

function step7(id) {
    if (id.length <= 2) {
        let last_char = id.charAt(id.length - 1);
        while (id.length < 3)
            id += last_char;
    }
    return id;
}