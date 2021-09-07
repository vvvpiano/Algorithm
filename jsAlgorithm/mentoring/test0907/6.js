const solution = (n, weak, dist) => {
    const distancesBetween = getDistances(weak, n)
    dist = dist.sort((a, b) => b - a)
    console.log(distancesBetween)
    for (let i = 1; i <= dist.length; i++) {
        if (canGo(distancesBetween, dist, i)) return i
    }
    return -1
}

const getDistances = (weak, n) => {
    const distances = []
    for (let i = 0; i < weak.length; i++) {
        let nextWeak = i === weak.length - 1 ? weak[0] : weak[i + 1]
        let distance = nextWeak - weak[i]
        distance = distance >= 0 ? distance : distance + n
        distances[i] = distance
    }
    return distances
}

const canGo = (distancesBetween, dist, i) => {
    splitArea(distancesBetween, i)
}

const splitArea = (between, people) => {
    console.log("before", between)
    const longests = between.sort((a, b) => b - a).slice(0, people)
    console.log("after", between)
    const longestsIndexs = []
    // for (let i = 0; i < longests.length; i++) {
    //     if (longests[i - 1] && longests[i - 1] === longests[i]) {
    //         longestsIndexs[i] = distancesBetween
    //     }
    // }
    console.log(longests)
}

const test = [
    [12, [1, 5, 6, 10], [1, 2, 3, 4]],
    [12, [1, 3, 4, 9, 10], [3, 5, 7]],
]

test.forEach((e) => console.log("answer", solution(...e)))
