const solution = (expression) => {
    const [parsed_array, operator] = parse_expression(expression);
    let combination = [];

    const recursion = (array, depth) => {
        if (array.length === depth) {
            combination.push(array);
            return;
        }

        for (let i = 0; i < operator.length; i++) {
            if (array.includes(operator[i]))
                continue;
            recursion(array.concat([operator[i]]), depth);
        }
    }

    recursion([], operator.length);

    let max = 0;
    for (let i = 0; i < combination.length; i++) {
        let result = calculate_with_priority(parsed_array, combination[i]);
        if (max < result)
            max = result;
    }
    return max;
}

const calculate_with_priority = (parsed_array, operator_priority) => {
    for (let i = 0; i < operator_priority.length; i++) {
        let op = operator_priority[i];
        let expression_after_op = [];
        let j = 0;
        while (j < parsed_array.length) {
            if (parsed_array[j] !== op)
                expression_after_op.push(parsed_array[j++]);
            else {
                let operand1 = expression_after_op.pop();
                let operator = parsed_array[j++];
                let operand2 = parsed_array[j++];
                expression_after_op.push(calculate(operand1, operand2, operator));
            }
        }
        parsed_array = expression_after_op;
    }
    let result = Math.abs(...parsed_array);
    return result;
}

const calculate = (operand1, operand2, operator) => {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        default:
            break;
    }
}

const parse_expression = (expression) => {
    let parsed_array = [];
    let operator = {'+': 0, '-': 0, '*': 0};
    let number = 0;
    let i = 0;
    while (i < expression.length) {
        if (!isNaN(expression.charAt(i))) {
            number = number * 10 + parseInt(expression.charAt(i));
            i++;
            continue;
        }
        parsed_array.push(number);
        number = 0;
        if (expression.charAt(i)) {
            parsed_array.push(expression.charAt(i));
            operator[expression.charAt(i)]++;
            i++;
        }
    }
    parsed_array.push(number)
    let operator_kind = Object.keys(operator).filter(e => operator[e] !== 0);
    return [parsed_array, operator_kind];
}

let test = [
    "100-200*300-500+20",
    "50*6-3*2"
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(test[i]));
}