const solution = s => {
    const nums = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    }

    let answer = 0;
    let i = 0;
    while (i < s.length) {
        if ('0' <= s.charAt(i) && s.charAt(i) <= '9') {
            answer = answer * 10 + parseInt(s.charAt(i));
            i++;
            continue;
        }
        let word = "";
        while (i < s.length && !('0' <= s.charAt(i) && s.charAt(i) <= '9')) {
            word += s.charAt(i);
            if (nums[word] !== undefined) {
                answer = answer * 10 + parseInt(nums[word]);
                word = "";
            }
            i++;
        }
    }
    return parseInt(answer);
}

const test = [
    "onetwothreefour",
    "one4seveneight",
    "23four5six7",
    "2three45sixseven",
    "123",
    "onezerozero"
]

for (let i = 0; i < test.length; i++) {
    console.log("case:", test[i], "answer:", solution(test[i]));
}