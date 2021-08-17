const solution = (gems) => {
    const gem_set = {};
    let size = 0;
    let p1 = 0, p2;

    for (let i = 0; i < gems.length; i++) {
        if (gem_set[gems[i]] === undefined) {
            gem_set[gems[i]] = 0;
            size++;
            p2 = i;
        }
    }

    for (let i = 0; i <= p2; i++) {
        gem_set[gems[i]]++;
    }
    
    let min = p2 - p1;
    let answer = [0, p2];
    while (p2 < gems.length) {
        if (p2 - p1 < min) {
            min = p2 - p1;
            answer = [p1, p2];
        }
        let removed = gems[p1];
        gem_set[removed]--;
        p1++;

        if (gem_set[removed] === 0) {
            while (true) {
                p2++;
                if (p2 >= gems.length)
                    break;
                let added = gems[p2];
                gem_set[added]++;
                if (added == removed)
                    break;
            }
        }
    }
    return [answer[0] + 1, answer[1] + 1];
}

const test = [
    ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
    ["AA", "AB", "AC", "AA", "AC"],
    ["XYZ", "XYZ", "XYZ"],
    ["ZZZ", "YYY", "NNNN", "YYY", "BBB"]
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(test[i]));
}