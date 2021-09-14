const solution = (id_list, report, k) => {
    const reports = {}
    const users = {}
    for (let i = 0; i < id_list.length; i++) {
        reports[id_list[i]] = 0
        users[id_list[i]] = []
    }
    report.forEach((r) => {
        let [user, reportedUser] = r.split(" ")
        if (!users[user].includes(reportedUser)) {
            users[user].push(reportedUser)
            reports[reportedUser]++
        }
    })
    const blackList = []
    Object.keys(reports).forEach((reportedUser) => {
        if (reports[reportedUser] >= k) blackList.push(reportedUser)
    })
    const answer = new Array(id_list.length).fill(0)
    for (let i = 0; i < id_list.length; i++) {
        const userReports = users[id_list[i]]
        for (let j = 0; j < blackList.length; j++) {
            if (userReports.includes(blackList[j])) answer[i]++
        }
    }
    return answer
}

const test = [
    [["muzi", "frodo", "apeach", "neo"], ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"], 2],
    [["con", "ryan"], ["ryan con", "ryan con", "ryan con", "ryan con"], 3],
]

test.forEach((t) => {
    console.log("answer: ", solution(...t))
})
