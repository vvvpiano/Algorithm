function solution(money, minratio, maxratio, ranksize, threshold, months) {
    for (let i = 0; i < months; i++) {
        if (maxratio <= 0 || money <= 0)
            break;
        money = tax_for_month(money, threshold, ranksize, minratio, maxratio)
    }
    return money;
}

const calculate_percentage = (money, threshold, ranksize, minratio, maxratio) => {
    let count = 0;
    if (money < threshold) // money가 0보다 작은 경우는 어떡하지?
        return 0;
    money -= threshold;
    while (true) {
        money -= ranksize;
        if (money < 0)
            break;
        else 
            count++;
    }
    return minratio + count <= maxratio ? minratio + count : maxratio;
}

const tax_for_month = (money, threshold, ranksize, minratio, maxratio) => {
    apprx_money = Math.floor(money / 100) * 100;
    let ratio = calculate_percentage(apprx_money, threshold, ranksize, minratio, maxratio);
    tax = apprx_money / 100 * ratio;
    console.log(money, apprx_money, ratio, tax, money - tax)
    return money - tax;
}

console.log(solution(1000000000, 50, 99, 100000, 0, 6))