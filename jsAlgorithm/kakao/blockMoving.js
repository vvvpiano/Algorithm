let map;
let N;
// let shortestWay = [];

const solution = (board) => {
    map = board;
    N = board.length;
    let current;
    // let current = [[1, 1], [1, 2]];
    let queue = [];
    let visited = [];
    let way = [];
    // recursion(current, way);
    // console.log(shortestWay);
    queue.push([[1, 1], [1, 2]]);
    while (queue.length > 0) {
        current = queue.shift();
        if (isVisited(current))
            continue;
        
    }
}

// const recursion = (current, way) => {
//     if (isEnd(current)) {
//         shortestWay = way;
//         return;
//     }
//     visited.push(current);
//     let candidates = findCandidate(current);
//     console.log("current:", current);
//     console.log("candidates:", candidates)
//     for (let i = 0; i < candidates.length; i++) {
//         console.log("current:", current, "candidate:", candidates[i]);
//         if (isVisited(candidates[i])) {
//             console.log("visited node!!");
//             continue;
//         }
//         recursion(candidates[i], way.concat([candidates[i]]));
//     }
// }

const isVisited = (position) => {
    console.log("visited 검사. visited:", visited, "검사 Position:", position)
    position = position.sort();
    for (let i = 0; i < visited.length; i++) {
        if (isSameNode(position, visited[i].sort()))
            return true;
    }
    return false;
}

const isSameNode = (node1, node2) => {
    let [node1First, node1Second] = node1;
    let [node2First, node2Second] = node2;
    if (node1First[0] !== node2First[0] || node1First[1] !== node2First[1])
        return false;
    if (node1Second[0] !== node2Second[0] || node1Second[1] !== node2Second[1])
        return false;
    return true;
}

const isEnd = (position) => {
    const [first, second] = position;
    if (first[0] === N && first[1] === N)
        return true;
    if (second[0] === N && second[1] === N)
        return true;
    return false;
}

const findCandidate = (current) => {
    let candidates = upDownLeftRightCandidates(current);
    candidates = candidates.concat(diagonalCandidates(current));
    return candidates;
}

const upDownLeftRightCandidates = (current) => {
    const [first, second] = current;
    let candidates = [];
    candidates.push([[first[0] - 1, first[1]], [second[0] - 1, second[1]]].sort()); // i좌표 각 -1
    candidates.push([[first[0] + 1, first[1]], [second[0] + 1, second[1]]].sort()); // i좌표 각 +1
    candidates.push([[first[0], first[1] - 1], [second[0], second[1] - 1]].sort()); // j좌표 각 -1
    candidates.push([[first[0], first[1] + 1], [second[0], second[1] + 1]].sort()); // j좌표 각 +1
    candidates = getPossible(candidates); // 수직수평 이동 중 가능한 좌표들만 담김
    return candidates;
}

const diagonalCandidates = (current) => {
    const [first, second] = current;
    let direction = first[0] === second[0] ? 0 : 1; // 수평이면 direction은 0, 수직이면 1
    let candidates = [];
    if (direction === 0) { // 수평인 경우
        candidates.push([first, [second[0] - 1, second[1] - 1]].sort()); // 왼쪽 위
        candidates.push([first, [second[0] + 1, second[1] - 1]].sort()); // 왼쪽 아래
        candidates.push([[first[0] - 1, first[1] + 1], second].sort()); // 오른쪽 위
        candidates.push([[first[0] + 1, first[1] + 1], second].sort()); // 오른쪽 아래
    } else {
        candidates.push([[second[0] - 1, second[1] - 1], first].sort()) // 왼쪽 위
        candidates.push([[second[0] - 1, second[1] + 1], first].sort()) // 오른쪽 위
        candidates.push([[first[0] + 1, first[1] - 1], second].sort()) // 왼쪽 아래
        candidates.push([[first[0] + 1, first[1] + 1], second].sort()) // 오른쪽 아래
    }
    candidates = getPossible(candidates);
    candidates = candidates.filter(e => canRotate(current, e));
    return candidates;
}

const getPossible = (candidates) => {
    let filteredCandidates = candidates.filter(candidate => {
        const [first, second] = candidate;
        let inRange = (isInMap(first) && isInMap(second))
        let inRoad = (isInRoad(first) && isInRoad(second));
        return (inRange && inRoad)
    })
    return filteredCandidates;
}

const canRotate = (current, next) => {
    let points = [...current, ...next];
    let xCount = [];
    points.forEach(e => {
        if (xCount[e[0]])
            xCount[e[0]] += 1;
        else
            xCount[e[0]] = 1;
    });
    let yCount = [];
    points.forEach(e => {
        if (yCount[e[1]])
            yCount[e[1]] += 1;
        else
            yCount[e[1]] = 1;
    })
    let length = Math.max(xCount.length, yCount.length);
    let newX, newY;
    for (let i = 0; i < length; i++) {
        if (xCount[i] === 1)
            newX = i;
        if (yCount[i] === 1)
            newY = i;
    }
    if (map[newX - 1][newY - 1] === 0)
        return true;
    return false;
}

const isInMap = (point) => {
    if (point[0] <= 0 || point[0] > N)
        return false;
    if (point[1] <= 0 || point[1] > N)
        return false;
    return true;
}

const isInRoad = (point) => {
    if (!isInMap(point))
        return false;
    let [i, j] = point;
    if (map[i - 1][j - 1] === 0)
        return true;
    return false;
}

// const board = [[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]];
const board = [[0, 0, 0, 1],[0, 0, 0, 1],[0, 1, 0, 1],[1, 1, 0, 0]];
solution(board);