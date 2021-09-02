const solution = (record) => {
    const uidDatabase = {}
    const log = []
    const answer = []
    for (let i = 0; i < record.length; i++) {
        const [type, uid, name] = record[i].split(" ")
        if (type == "Enter" || type == "Change") uidDatabase[uid] = name
        if (type == "Enter" || type == "Leave") log.push([type, uid])
    }
    for (let i = 0; i < 4; i++) {
        let [type, uid] = log[i]
        if (type == "Enter") {
            answer.push(`${uidDatabase[uid]}님이 들어왔습니다.`)
        } else {
            answer.push(`${uidDatabase[uid]}님이 나갔습니다.`)
        }
    }

    return answer
}

const record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"]
console.log("answer:", solution(record))
