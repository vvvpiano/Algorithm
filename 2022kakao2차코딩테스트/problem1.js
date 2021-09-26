import { start, waitingLine, gameResult, userInfo, match, changeGrade, score } from "./api.js"

let time
let interval
const init = async (problem_number) => {
    await start(problem_number)
    const user_info = await userInfo()
    const commands = user_info.map((user) => {
        return { ...user, grade: 4000 }
    })
    await changeGrade(commands)
}

const simulate = async () => {
    const waiting_line = await waitingLine()
    console.log("waiting", waiting_line)
    let user_info = await userInfo()

    const game_result = await gameResult()
    console.log("game결과: ", game_result)

    const newest_grade = applyResult(game_result, user_info)

    await changeGrade(newest_grade)
    user_info = await userInfo()

    const pairs = makeMatch(waiting_line, user_info, time)
    const match_pairs = await match(pairs)
    time = match_pairs.time + 1

    if (match_pairs.status === "finished") {
        clearInterval(interval)
        const score_result = await score()
        console.log(score_result)
    }
}

const makeMatch = (waiting_line, user_info, current_time) => {
    console.log("current:", current_time)
    let pointer = 0
    const pairs = []
    while (true) {
        if (!waiting_line[pointer]) break
        const player1_id = waiting_line[pointer].id
        const player2_id = findCounter(pointer, waiting_line, user_info, current_time)
        // console.log("match pair", player1_id, player2_id)
        if (player2_id === null) {
            pointer++
            continue
        }
        pairs.push([player1_id, player2_id])
        waiting_line.splice(pointer, 1)
        for (let i = 0; i < waiting_line.length; i++) {
            if (waiting_line[i].id === player2_id) {
                waiting_line.splice(i, 1)
            }
            break
        }
    }
    return pairs
}

const findCounter = (player1_pointer, waiting_line, user_info, current_time) => {
    const player1_id = waiting_line[player1_pointer].id
    const player1_info = user_info.find((user) => user.id === player1_id)

    const matching_score = waiting_line.slice(player1_pointer + 1, waiting_line.length).map((player) => {
        const player_info = user_info.find((user) => user.id === player.id)
        const grade_diff = Math.abs(player1_info.grade - player_info.grade)
        const grade_score = (10000 - grade_diff) / 10
        const time_score = (current_time - player.from) * 100
        const score = grade_score + time_score
        return { id: player.id, matching_score: score, grade_score, time_score }
    })

    if (matching_score.length === 0) return null

    // 이 정렬 기준을 바꿔서 성능 향상을 해보기
    matching_score.sort((a, b) => b.matching_score - a.matching_score)
    // console.log(matching_score)
    if (matching_score[0].matching_score < 1200) {
        if (matching_score[0].grade_score >= 800) return matching_score[0].id
        return null
    }
    return matching_score[0].id
}

const applyResult = (game_result, user_info) => {
    const commands = []
    const getRandomE = () => {
        return Math.floor(Math.random() * 10) - 5
    }
    game_result.forEach((result) => {
        const winner_info = user_info.find((user) => user.id === result.win)
        const loser_info = user_info.find((user) => user.id === result.lose)
        const ability_diff = ((40 - result.taken + getRandomE()) * 99000) / 35 / 30
        let winner_new_grade
        let loser_new_grade
        const earn_point = Math.ceil(ability_diff / 2)
        winner_new_grade = winner_info.grade + earn_point
        loser_new_grade = loser_info.grade - (ability_diff - earn_point)
        winner_new_grade = winner_new_grade <= 9999 ? winner_new_grade : 9999
        loser_new_grade = loser_new_grade >= 0 ? loser_new_grade : 0

        commands.push({ id: result.win, grade: Math.floor(winner_new_grade) })
        commands.push({ id: result.lose, grade: Math.floor(loser_new_grade) })
    })
    return commands
}

const problem = async (problem_number) => {
    await init(problem_number)
    time = 0
    interval = setInterval(simulate, 300)
}

// await problem(1)
await problem(2)
