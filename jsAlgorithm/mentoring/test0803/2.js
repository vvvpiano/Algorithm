const solution = (str1, str2) => {
    let multiset1 = make_multiset(str1);
    let multiset2 = make_multiset(str2);
    return J_similarity(multiset1, multiset2);
}

const make_multiset = (str) => {
    str = str.toUpperCase();
    let set = [];
    for (let i = 0; i < str.length - 1; i++) {
        if (is_alphabet(str.charAt(i)) && is_alphabet(str.charAt(i + 1))) {
            set.push(str.charAt(i) + str.charAt(i + 1))
        }
    }
    return set.sort();
}

const is_alphabet = (char) => {
    return ('A' <= char && char <= 'Z');
}

const J_similarity = (set1, set2) => {
    if (set1.length === 0 && set2.length === 0)
        return 1 * 65536;
    let unique_set1 = Array.from(new Set(set1));
    let intersection = 0;
    for (let i = 0; i < unique_set1.length; i++) {
        const target = unique_set1[i];
        let count_in_set1 = set1.filter(e => e == target).length;
        let count_in_set2 = set2.filter(e => e == target).length;
        intersection += Math.min(count_in_set1, count_in_set2);
    }
    let union = set1.length + set2.length - intersection;
    return Math.floor((intersection / union) * 65536);
}

let test = [['FRANCE', 'french'], ['handshake', 'shake hands'], ['aa1+aa2', 'AAAA12'], ['E=M*C^2', 'e=m*c^2']];
for (let i = 0; i < test.length; i++) {
    console.log(solution(test[i][0], test[i][1]))
}