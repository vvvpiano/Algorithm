const solution = (dartResult) => {
    let dot_object = parseResult(dartResult);
    return calculate_result(dot_object);
}

const calculate_result = (dot_object) => {
    let score = new Array(3);
    for (let i = 0; i < 3; i++) {
        score[i] = dot_object[i].number;
        if (dot_object[i].power)
            score[i] = Math.pow(score[i], dot_object[i].power);
    }
    for (let i = 0; i < 3; i++) {
        if (dot_object[i].option === '*') {
            score[i] *= 2;
            if (i !== 0)
                score[i - 1] *= 2;
        }
        if (dot_object[i].option === '#') {
            score[i] *= -1;
        }
    }
    return score.reduce((acc, cur) => acc + cur);
}

const parseResult = (str) => {
    let score_object = [];
    let index = 0;
    let number, power, option;
    for (let i = 0; i < 3; i++) {
        [number, index] = find_number(str, index);
        [power, index] = find_power(str, index);
        [option, index] = find_option(str, index);
        score_object.push({number, power, option});
    }
    return score_object;
}

const find_number = (str, start_index) => {
    let number = 0;
    while (!isNaN(str.charAt(start_index))) {
        number = number * 10 + parseInt(str.charAt(start_index));
        start_index++;
    }
    return [number, start_index];
}

const find_power = (str, start_index) => {
    let char = str.charAt(start_index);
    let power_value = {'S': 1, 'D': 2, 'T': 3}
    if (char === 'S' || char === 'D' || char === 'T') {
        return [power_value[char], ++start_index];
    } else {
        return [null, start_index];
    }
}

const find_option = (str, start_index) => {
    let char = str.charAt(start_index);
    if (char === '*' || char === '#') {
        return [char, ++start_index];
    } else {
        return [null, start_index];
    }
}

let result = ['1S2D*3T', '1D2S#10S', '1D2S0T', '1S*2T*3S', '1D#2S*3S', '1T2D3D#', '1D2S3T*'];

for (let i = 0; i < result.length; i++) {
    console.log(solution(result[i]));
}