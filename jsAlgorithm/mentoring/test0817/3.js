const solution = (msg) => {
    const answer = [];
    const dict = {};
    for (let i = 1; i <= 26; i++) {
        dict[String.fromCharCode(i + 64)] = i;
    }
    let dict_last = 27;

    let i = 0;
    while (i < msg.length) {
        let j = i + 1;
        let substr = msg.charAt(i);
        let nextstr;
        for (; j <= msg.length; j++) {
            nextstr = msg.substr(i, j - i);
            if (!dict[nextstr])
                break;
            substr = nextstr;
        }
        answer.push(dict[substr]);
        if (nextstr)
            dict[nextstr] = dict_last++;
        i += substr.length;
    }
    return answer;
}

// const test = "KAKAO"
// const test = "TOBEORNOTTOBEORTOBEORNOT"
const test = "ABABABABABABABAB"
// const test = "ABCDEFGAB"
console.log(solution(test))