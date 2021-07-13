function solution(line1, line2) {
    let space = 0;
    let answer = 0;
    while (line1.length >= line2.length + (line2.length - 1) * space) {
        answer += find_variation(line1, line2, space++);
    }
    console.log(answer)
    return answer;
}

const find_variation = (line1, line2, space) => {
    console.log("space:", space)
    let count = 0;
    let i = 0;
    for (let i = 0; i < line1.length; i++) {
        let str = get_substr(line1, line2, i, space);
        console.log(str)
        if (str == line2)
            count++;
    }
    console.log(space, count)
    return count;
}

const get_substr = (line1, line2, start, space) => {
    let substr = line1.charAt(start);
    let i = start;
    while (i + space + 1 < line1.length && (substr.length < line2.length)) {
        i += space + 1;
        substr += line1.charAt(i);
    }
    return substr;
}

solution("abacaba", "acb")