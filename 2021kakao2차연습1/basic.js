import { start, locations, trucks, simulate, score } from "./api.js"

const auth_key = await start(1)

const simulateService = async () => {
    const location_data = await locations(auth_key)
    const simulate_status = await simulate(auth_key, [])
    // const simulate_status = await simulate(auth_key, commands)
    console.log(simulate_status)
    if (simulate_status.status === "finished") {
        clearInterval(interval)
        const score_auth = await score(auth_key)
        console.log(score_auth)
    }
}

const interval = setInterval(simulateService, 100)
