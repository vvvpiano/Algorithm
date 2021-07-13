const solution = (s) => {
    let number = "";
    for (let i = 0; i < s.length; i++) {
        if (isNumber(s.charAt(i))) {
            number += s.charAt(i);
        } else {
            let n_str = "";
            let j = 0;
            while (!isNumber(s.charAt(i + j)) && (i+j) < s.length) {
                n_str += s.charAt(i + j++);;
                if (findWord(n_str) >= 0) {
                    number += findWord(n_str);
                    break;
                }
            }
            i = i + j - 1;
        }
    }
    return parseInt(number);
}

const isNumber = (char) => {
    if ('0' <= char && char <= '9')
        return true;
    return false;
}

const findWord = n_str => {
    let word = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    for (let i = 0; i < word.length; i++) {
        if (word[i] == n_str)
            return i;
    }
    return -1;
}

console.log(solution('onetwothreefivefourzeroeightninesevensixfourfourthree'));