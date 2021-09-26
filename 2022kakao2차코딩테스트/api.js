import fetch from "node-fetch"
const authToken = "8d348fc37372e727de0c50a1cddf6529"
const baseURL = "https://huqeyhi95c.execute-api.ap-northeast-2.amazonaws.com/prod"

let header
export const start = async (problem) => {
    try {
        const res = await fetch(`${baseURL}/start`, {
            method: "POST",
            headers: {
                "X-Auth-Token": authToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ problem }),
        })
        const { auth_key } = await res.json()
        header = {
            Authorization: auth_key,
            "Content-Type": "application/json",
        }
    } catch (err) {
        throw new Error("START 실패: " + err.message)
    }
}

export const waitingLine = async () => {
    try {
        const res = await fetch(`${baseURL}/waiting_line`, {
            method: "GET",
            headers: header,
        })
        const { waiting_line } = await res.json()
        return waiting_line
    } catch (err) {
        throw new Error("WAITING_LINE 실패: " + err.message)
    }
}

export const gameResult = async () => {
    try {
        const res = await fetch(`${baseURL}/game_result`, {
            method: "GET",
            headers: header,
        })
        const { game_result } = await res.json()
        return game_result
    } catch (err) {
        throw new Error("GAME_RESULT 실패: " + err.message)
    }
}

export const userInfo = async () => {
    try {
        const res = await fetch(`${baseURL}/user_info`, {
            method: "GET",
            headers: header,
        })
        const { user_info } = await res.json()
        return user_info
    } catch (err) {
        throw new Error("USER_INFO 실패: " + err.message)
    }
}

export const match = async (pairs) => {
    console.log("pairs", pairs)
    try {
        const res = await fetch(`${baseURL}/match`, {
            method: "PUT",
            headers: header,
            body: JSON.stringify({ pairs }),
        })
        return await res.json()
    } catch (err) {
        throw new Error("MATCH 실패: " + err.message)
    }
}

export const changeGrade = async (commands) => {
    console.log("commands", commands)
    try {
        const res = await fetch(`${baseURL}/change_grade`, {
            method: "PUT",
            headers: header,
            body: JSON.stringify({ commands }),
        })
        return await res.json()
    } catch (err) {
        throw new Error("CHANGE_GRADE 실패: " + err.message)
    }
}

export const score = async () => {
    try {
        const res = await fetch(`${baseURL}/score`, {
            method: "GET",
            headers: header,
        })
        return await res.json()
    } catch (err) {
        throw new Error("SCORE 실패: " + err.message)
    }
}

// const auth_key = await start(1)
// console.log(auth_key)
// const waiting_line = await waitingLine()
// console.log(waiting_line)
// const game_result = await gameResult()
// console.log(game_result)
// const user_info = await userInfo()
// console.log(user_info)
// const match_result = await match([[]])
// console.log(match_result)
// const change_grade = await changeGrade([])
// console.log(change_grade)
