function solution(relation) {
    let number_of_field = relation[0].length;
    let combinations = makeCombination(number_of_field);
    let answer = [];
    while (combinations.length > 0) {
        let field_comb = combinations.shift();
        if (isKey(field_comb, relation)) {
            answer.push(field_comb);
            combinations = removeIncludes(field_comb, combinations);
        }
    }

    return answer.length;
}

const removeIncludes = (field_comb, combinations) => {
    const filtered = combinations.filter(comb => {
            let set = new Set([...field_comb, ...comb]);
            if (set.size === comb.length) // field_comb를 포함하고 있는 comb
                return false; // 걸러야 함
            return true; // 그렇지 않으면 포함
        })
    return filtered;
}

const isKey = (field_comb, relation) => {
    let selected_field = [];
    for (let i = 0; i < relation.length; i++) {
        let current_row = relation[i];
        let selected = field_comb.map(e => current_row[e]);
        selected_field.push(selected);
    }
    let is_duplicated = false;
    for (let i = 0; i < selected_field.length - 1; i++) {
        for (let j = i + 1; j < selected_field.length; j++) {
            if (isSameArray(selected_field[i], selected_field[j])) {
                is_duplicated = true;
                break;
            }
        }
    }
    return !is_duplicated;
}

const isSameArray = (a1, a2) => {
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i])
            return false;
    }
    return true;
}

const makeCombination = (n) => {
    let combinations = [];
    
    const findComb = (array, start, current, depth) => {
        if (current === depth && !combinations.includes(array)) {
            combinations.push(array);
            return ;
        }
        for (let i = start; i < n; i++) 
            findComb(array.concat([i]), i + 1, current + 1, depth);
    }

    for (let i = 1; i <= n; i++)
        findComb([], 0, 0, i);
    
    return combinations;
}



const relation = [["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]];
let answer = solution(relation);
console.log(answer);
