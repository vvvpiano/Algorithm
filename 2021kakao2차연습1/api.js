import fetch from "node-fetch"
const authToken = "3474bb5ae4f12bccfddfc4f58d8812fc"
const baseURL = "https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users"

export const start = async (problem) => {
    try {
        const res = await fetch(`${baseURL}/start`, {
            method: "POST",
            headers: {
                "X-Auth-Token": authToken,
                "Content-Type": "application/json",
            },
            params: {
                problem: problem,
            },
            body: JSON.stringify({ problem }),
        })
        if (!res.ok) throw new Error("서버 이상 " + res.json())
        const { auth_key } = await res.json()
        return auth_key
    } catch (err) {
        throw new Error("START 실패: " + err.message)
    }
}

export const locations = async (auth_key) => {
    try {
        const res = await fetch(`${baseURL}/locations`, {
            method: "GET",
            headers: {
                Authorization: auth_key,
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) throw new Error("서버 이상 " + res.json())
        const { locations } = await res.json()
        return locations
    } catch (err) {
        throw new Error("LOCATIONS 실패: " + err.message)
    }
}

export const trucks = async (auth_key) => {
    try {
        const res = await fetch(`${baseURL}/trucks`, {
            method: "GET",
            headers: {
                Authorization: auth_key,
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) throw new Error("서버 이상 " + res.json())
        const { trucks } = await res.json()
        return trucks
    } catch (err) {
        throw new Error("TRUCKS 실패: " + err.message)
    }
}

export const simulate = async (auth_key, commands) => {
    console.log(commands)
    try {
        const res = await fetch(`${baseURL}/simulate`, {
            method: "PUT",
            headers: {
                Authorization: auth_key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commands }),
        })
        if (!res.ok) throw new Error("서버 이상 " + res.json())
        return await res.json()
    } catch (err) {
        throw new Error("SIMULATE 실패: " + err.message)
    }
}

export const score = async (auth_key) => {
    try {
        const res = await fetch(`${baseURL}/score`, {
            method: "GET",
            headers: {
                Authorization: auth_key,
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) throw new Error("서버 이상 " + res.json())
        const { score } = await res.json()
        return score
    } catch (err) {
        throw new Error("SCORE 실패: " + err.message)
    }
}
