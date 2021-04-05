function solution(needs, r) {
    let components_kind = needs[0].length;
    let combinations = makeCombinations(components_kind, r);
    let count = new Array(combinations.length);
    for (let i = 0; i < combinations.length; i++) {
        count[i] = countPossible(needs, combinations[i]);
    }

    let max = Math.max(...count);
    return max;
}

const countPossible = (needs, combination) => {
    let count = 0;
    for (let i = 0; i < needs.length; i++) {
        if (canMakeProductWithCombination(needs[i], combination))
            count++;
    }
    return count;
}

const canMakeProductWithCombination = (product, combination) => {
    for (let i = 0; i < product.length; i++) {
        if (product[i] === 1 && !combination.includes(i))
            return false;
    }
    return true;
}

const makeCombinations = (components_kind, r) => {
    let combinations = [];

    const combRecursion = (array, r, start) => {
        if (array.length === r) {
            combinations.push(array)
            return;
        }
        for (let i = start; i < components_kind; i++) {
            combRecursion(array.concat([i]), r, i + 1);
        }
    }
    combRecursion([], r, 0);
    return combinations;
}


const needs = [ [ 1, 0, 0 ], [ 1, 0, 0 ], [1, 1, 0], [1, 1, 0], [1, 0, 1], [1, 1, 0], [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 1, 1] ];
const r = 2;
console.log(solution(needs, r));