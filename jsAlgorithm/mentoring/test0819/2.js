const solution = places => {
    const answer = [];
    for (let i = 0; i < 5; i++) {
        if (is_all_correct(places[i]))
            answer.push(1);
        else
            answer.push(0);
    }
    return answer;
}

const is_all_correct = (place) => {
    place = place.map(line => [...line]);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (place[i][j] === 'P')
                if (!check_one_person(i, j, place))
                    return false;
        }
    }
    return true;
}

const check_one_person = (r, c, place) => {
    const EWSN = get_EWSN_position(r, c).filter(position => is_in_range(...position));
    for (let i = 0; i < EWSN.length; i++) {
        const [row, col] = EWSN[i];
        if (place[row][col] === 'P')
            return false;
    }

    const manhattan = get_manhattan2_position(r, c);
    for (let i = 0; i < manhattan.length; i++) {
        let {position, partition} = manhattan[i];
        if (!is_in_range(...position))
            continue;
        const [row, col] = position;
        if (place[row][col] !== 'P')
            continue;
        partition = partition.filter(p => is_in_range(...p))
        for (let i = 0; i < partition.length; i++) {
            const [p_r, p_c] = partition[i];
            if (is_in_range(p_r, p_c) && place[p_r][p_c] !== 'X')
                // console.log(`[${r}, ${c}] 자리의 응시자 ${place[r][c]}가 [${row}, ${col}] 자리의 응시자 ${place[row][col]}과의 맨해튼 거리 2에서 [${p_r}, ${p_c}]자리의 파티션 ${place[p_r][p_c]}으로 구분되지 않았습니다.`)
                return false;
        }
    }
    return true;
}

const get_EWSN_position = (r, c) => {
    return [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1]
    ]
}

const get_manhattan2_position = (r, c) => {
    return [
        {position: [r - 2, c], partition: [[r - 1, c]]},
        {position: [r + 2, c], partition: [[r + 1, c]]},
        {position: [r, c - 2], partition: [[r, c - 1]]},
        {position: [r, c + 2], partition: [[r, c + 1]]},
        {position: [r - 1, c - 1], partition: [[r - 1, c], [r, c - 1]]},
        {position: [r - 1, c + 1], partition: [[r - 1, c], [r, c + 1]]},
        {position: [r + 1, c - 1], partition: [[r, c - 1], [r + 1, c]]},
        {position: [r + 1, c + 1], partition: [[r, c + 1], [r + 1, c]]},
    ]
}

const is_in_range = (r, c) => {
    if (r < 0 || r >= 5)
        return false;
    if (c < 0 || c >= 5)
        return false;
    return true;
}

const test = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

console.log(solution(test));