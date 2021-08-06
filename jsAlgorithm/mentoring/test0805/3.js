const solution = (user_id, banned_id) => {
    let banned_dic = {};
    for (let i = 0; i < banned_id.length; i++) {
        if (banned_dic[banned_id[i]])
            banned_dic[banned_id[i]]["count"] += 1;
        else {
            banned_dic[banned_id[i]] = find_match(banned_id[i], user_id);
        }
    }
    console.log(banned_dic)
    
    let combination =  make_combination(banned_id, banned_dic);
    console.log(combination);
    let answer = [];
    answer.push(combination[0])
    for (let i = 1; i < combination.length; i++) {
        if (!is_in_answer(combination[i], answer)) {
            answer.push(combination[i]);
        }
    }
    console.log(answer);
    return answer.length;
}

const find_match = (pattern, user_id) => {
    let matched = [];
    for (let i = 0; i < user_id.length; i++) {
        if (is_matched(pattern, user_id[i]))
            matched.push(user_id[i]);
    }

    return {
        "count": 1,
        "match": matched
    };
}

const is_matched = (pattern, id) => {
    if (pattern.length != id.length)
        return false;
    for (let i = 0; i < pattern.length; i++) {
        if (pattern.charAt(i) === '*')
            continue;
        if (pattern.charAt(i) !== id.charAt(i))
            return false;
    }
    return true;
}

const is_in_answer = (target, answer) => {
    for (let i = 0; i < answer.length; i++) {
        if (is_same_array(target, answer[i]))
            return true;
    }
    return false;
}

const make_combination = (banned_id, banned_dic) => {
    let combination = [];

    const recursion = (candidate, depth) => {
        if (depth === banned_id.length) {
            combination.push(candidate.sort());
            return;
        }
        let banned = banned_id[depth];
        for (let i = 0; i < banned_dic[banned].match.length; i++) {
            let next_added = banned_dic[banned].match[i];
            if (candidate.includes(next_added))
                continue;
            recursion(candidate.concat([next_added]), depth + 1);
        }
    }

    recursion([], 0);
    return combination;
}

const is_same_array = (a1, a2) => {
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i])
            return false;
    }
    return true;
}
console.log(solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "*rodo", "******", "******"]));