const solution = (scores) => {
    let answer = ""
    for (let i = 0; i < scores.length; i++) {
        const myScore = scores.map((line) => line[i])
        // console.log(myScore)
        answer += getGrade(i, myScore)
    }
    return answer
}

const getGrade = (i, scoreArray) => {
    const average = getAverage(i, scoreArray)
    if (90 <= average) return "A"
    else if (80 <= average) return "B"
    else if (70 <= average) return "C"
    else if (50 <= average) return "D"
    return "F"
}

const getAverage = (studentNumber, scoreArray) => {
    let sum = scoreArray.reduce((acc, cur) => acc + cur)
    let divider = scoreArray.length
    const selfScore = scoreArray[studentNumber]
    scoreArray.sort((a, b) => a - b)
    const minScore = scoreArray[0]
    const maxScore = scoreArray[scoreArray.length - 1]
    if (selfScore === minScore && scoreArray[0] !== scoreArray[1]) {
        // console.log("minScore:", minScore, "selfScore:", selfScore, sum)
        sum -= selfScore
        divider--
    } else if (selfScore === maxScore && scoreArray[scoreArray.length - 1] !== scoreArray[scoreArray.length - 2]) {
        // console.log("maxScore:", maxScore, "selfScore:", selfScore, sum)
        sum -= selfScore
        divider--
    }
    // console.log("합계:", sum)
    return sum / divider
}

const scores = [
    [70, 49, 90],
    [68, 50, 38],
    [73, 31, 100],
]
console.log(solution(scores))
