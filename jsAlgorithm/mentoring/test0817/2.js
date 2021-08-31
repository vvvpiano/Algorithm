const solution = files => {
    let files_info = files.map(file => parse_file(file));
    // console.log(files_info)

    let same = [];

    const comparator = (a, b) => {
        if (a[1] != b[1])
            return a[1].localeCompare(b[1]);
        if (a[2] != b[2])
            return a[2] - b[2];
        return 0;
    };


    for (let i = 0; i < files_info.length - 1; i++) {
        let same_pairs = [files_info[i]];
        for (let j = i + 1; j < files_info.length; j++) {
            if (comparator(files_info[i], files_info[j]) === 0)
                same_pairs.push(files_info[j]);
        }
        if (same_pairs.length > 1)
            same.push(same_pairs);
    }

    files_info.sort(comparator);

    const answer = files_info.map(info => info[0]);
    // console.log(same)
    for (let i = 0; i < same.length; i++) {
        const indexes = same[i].map(info => answer.indexOf(info[0]));
        if (is_ascending(indexes))
            continue;
        const correct = same[i].map(info => info[0]);
        answer.splice(Math.min(...indexes), indexes.length, ...correct);
    }

    return answer;
}

const is_ascending = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1])
            return false;
    }
    true;
}

const parse_file = file => {
    let head, number, tail;
    let i = 0;
    while (i < file.length && isNaN(file.charAt(i)))
        i++;
    head = file.substr(0, i).toLowerCase();

    let number_start = i;
    while ('0' <= file.charAt(i) && file.charAt(i) <= '9')
        i++;
    number = parseInt(file.substr(number_start, i - number_start));
    tail = file.substr(i, file.length - i);
    return [file, head, number, tail]
}

const test = ["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"];
// const test = ["F-5 Freedom Fighter", "b-50 Superfortress", "A-10 Thunderbolt II", "B-050 Superfortress", "F-14 Tomcat", "Aa-10 Thunderbolt II"];
console.log(solution(test));