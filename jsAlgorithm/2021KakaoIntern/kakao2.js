const solution = (places) => {
    var answer = [];
    for (let i = 0; i < 5; i++) {
        let room = places[i];
        answer.push(checkRoom(room));
    }
    return answer;
}

const checkRoom = (room) => {
    room = room.map(e => [...e]);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (room[i][j] === 'P') { // 사람인 경우만 검사
                // console.log(`room ${i},${j} 검사. ${room[i][j]}`);
                let result = checkPerson(i, j, room);
                if (result === 0) // 한명이라도 조건 미충족이면 바로 리턴
                    return 0;
            }
        }
    }
    return 1; // 조기리턴 안되면 조건을 모두 충족했다는 뜻
}

const checkPerson = (i, j, room) => {
    let area = getManhattanArea(i, j);
    // console.log(`<<${i},${j}의 manhattan area>>`);
    for (let k = 0; k < area.length; k++) {
        if (!isInMap(area[k]))
            continue;
        if (room[area[k][0]][area[k][1]] === 'P') { // 사람인 경우만 검사
            let result;
            if (area[k][0] == i || area[k][1] == j)
                result = checkNSWE(area[k], i, j, room);
            else
                result = checkDiag(area[k], i, j, room);
            if (result == 0)
                return 0;
        }
    }
    return 1; // 조기리턴 안되면 조건을 모두 충족했다는 뜻
}

const checkNSWE = (node, i, j, room) => {
    let mid_i = (node[0] + i) / 2;
    let mid_j = (node[1] + j) / 2;
    if (isPartition([mid_i, mid_j], room)) // 테이블이면 ok
        return 1; 
    return 0;
}

const checkDiag = (node, i, j, room) => {
    let diag_1 = [node[0], j];
    let diag_2 = [i, node[1]];
    if (isPartition(diag_1, room) && isPartition(diag_2, room))
        return 1;
    return 0;
}

const isPartition = (point, room) => {
    console.log(room)
    let [i, j] = point;
    if (room[i][j] === 'X')
        return true;
    return false;
}

const getManhattanArea = (i, j) => {
    let area = [[i-2, j], [i-1, j-1], [i-1, j], [i-1, j+1], [i, j-2], [i, j-1], [i, j+1], [i, j+2], [i+1, j-1], [i+1, j], [i+1, j+1], [i+2, j]];
    return area;
}

const isInMap = ([i, j]) => {
    if (0 <= i && i < 5 && 0 <= j && j < 5)
        return true;
    return false;
}

let places = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPXX", "OXXXP", "POOXX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];

let result = solution(places);
console.log("result:", result);