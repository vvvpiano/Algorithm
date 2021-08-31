const solution = (table, languages, preference) => {
    table = table.map((column) => column.split(" "))
    let totalScore = []
    for (let i = 0; i < table.length; i++) {
        const jobScore = getJobScore(languages, preference, table[i])
        totalScore.push([table[i][0], jobScore])
    }
    totalScore.sort((a, b) => {
        if (a[1] !== b[1]) return b[1] - a[1]
        else return a[0].localeCompare(b[0])
    })
    return totalScore[0][0]
}

const getJobScore = (languages, preference, job) => {
    let sum = 0
    for (let i = 0; i < languages.length; i++) {
        const index = job.indexOf(languages[i])
        if (index < 0) continue
        sum += (6 - index) * preference[i]
    }
    return sum
}

const table = ["SI JAVA JAVASCRIPT SQL PYTHON C#", "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++", "HARDWARE C C++ PYTHON JAVA JAVASCRIPT", "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP", "GAME C++ C# JAVASCRIPT C JAVA"]
const languages = ["PYTHON", "C++", "SQL"]
const preference = [7, 5, 5]

console.log(solution(table, languages, preference))
