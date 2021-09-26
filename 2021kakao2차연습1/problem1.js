import { start, locations, trucks, simulate, score } from "./api.js"

const auth_key = await start(1)

const simulateService = async () => {
    const location_data = await locations(auth_key)
    const commands = await makeTruckCommand(location_data)
    console.log(commands)
    const simulate_status = await simulate(auth_key, commands)
    // const simulate_status = await simulate(auth_key, commands)
    console.log(simulate_status)
    if (simulate_status.status === "finished") {
        clearInterval(interval)
        const score_auth = await score(auth_key)
        console.log(score_auth)
    }
}

const interval = setInterval(simulateService, 400)

const makeTruckCommand = async (location_data) => {
    const locations_in_need = location_data
        .filter((location) => location.located_bikes_count === 0)
        .map((location) => {
            const location_info = { ...location, willVisited: false }
            return location_info
        })
    if (locations_in_need.length === 0) return []
    const map = makeMap(location_data)
    console.log(map)

    const truck_data = await trucks(auth_key)
    console.log(truck_data)
    const new_truck_location = truck_data.map((truck) => {
        let min_cost = Number.MAX_SAFE_INTEGER
        let min_location_id
        let n_of_movable_bikes
        let pickup_location_id
        for (let i = 0; i < locations_in_need.length; i++) {
            const location = locations_in_need[i]
            let n_of_bike = 1
            if (location.willVisited) continue
            let cost_result = calculateCost(truck.location_id, location.id, map, 1)
            const cost_result_to_move_2 = calculateCost(truck.location_id, location.id, map, 2)
            if (cost_result_to_move_2 !== null) {
                cost_result = cost_result_to_move_2
                n_of_bike = 2
            }
            if (cost_result && cost_result[0] < min_cost) {
                min_cost = cost_result[0]
                min_location_id = location.id
                pickup_location_id = cost_result[1]
                n_of_movable_bikes = n_of_bike
            }
        }
        // console.log("truck_id", truck.id, "truck location:", truck.location_id)
        // console.log(min_cost, min_location_id, n_of_movable_bikes)
        pickupBikes(min_location_id, pickup_location_id, n_of_movable_bikes, map, locations_in_need)
        return { ...truck, destination_id: min_location_id, pickup_location_id, n_of_movable_bikes }
    })
    console.log("new_truck_location", new_truck_location)
    return makeCommand(new_truck_location)
    // console.log("truck_command", truck_command)
}

const pickupBikes = (min_location_id, pickup_location_id, n_of_movable_bikes, map, locations_in_need) => {
    if (pickup_location_id != undefined) {
        const [row, col] = locationIdToPosition(pickup_location_id)
        map[row][col] -= n_of_movable_bikes
        for (let i = 0; i < locations_in_need.length; i++) {
            if (locations_in_need[i].id === min_location_id) {
                locations_in_need[i].willVisited = true
                break
            }
        }

        // console.log("after pickup bikes", map)
    }
}

const makeCommand = (new_truck_location) => {
    const commands = []
    for (let i = 0; i < new_truck_location.length; i++) {
        const truck = new_truck_location[i]
        if (!truck.destination_id) continue
        let command = makeMoveCommand(truck.location_id, truck.pickup_location_id)
        for (let i = 0; i < truck.n_of_movable_bikes; i++) command.push(5)
        command = command.concat(makeMoveCommand(truck.pickup_location_id, truck.destination_id))
        for (let i = 0; i < truck.n_of_movable_bikes; i++) command.push(6)
        commands.push({ truck_id: truck.id, command })
    }
    return commands
}

const makeMoveCommand = (start_id, dest_id) => {
    const command = []
    const [r1, c1] = locationIdToPosition(start_id)
    const [r2, c2] = locationIdToPosition(dest_id)
    const horizontal_move_command = c1 - c2 < 0 ? 2 : 4
    const vertical_move_command = r1 - r2 < 0 ? 1 : 3
    for (let i = 0; i < Math.abs(c1 - c2); i++) command.push(horizontal_move_command)
    for (let i = 0; i < Math.abs(r1 - r2); i++) command.push(vertical_move_command)
    return command
}

const calculateCost = (truck_location_id, location_id, map, n_of_bike) => {
    // const N_OF_AVERAGE_REQUEST = 2
    // const plenty_threshold = N_OF_AVERAGE_REQUEST + n_of_bike
    const plenty_threshold = n_of_bike + 1
    let is_plenty_exist = false
    let plenty_location_id
    const [r1, c1] = locationIdToPosition(truck_location_id)
    const [r2, c2] = locationIdToPosition(location_id)
    for (let i = Math.min(r1, r2); i <= Math.max(r1, r2); i++) {
        for (let j = Math.min(c1, c2); j <= Math.max(c1, c2); j++) {
            if (map[i][j] >= plenty_threshold) {
                is_plenty_exist = true
                plenty_location_id = i + j * 5
                break
            }
        }
    }
    if (!is_plenty_exist) return null
    const total_cost = getDistanceWithId(truck_location_id, location_id) + n_of_bike * 2
    if (total_cost > 10) return null
    else return [total_cost, plenty_location_id]
}

const makeMap = (location_data) => {
    const map = []
    for (let i = 0; i < 5; i++) {
        map[i] = []
    }
    location_data.forEach((data) => {
        const [row, col] = locationIdToPosition(data.id)
        map[row][col] = data.located_bikes_count
    })
    return map
}

const locationIdToPosition = (id) => {
    const row = id % 5
    const col = Math.floor(id / 5)
    return [row, col]
}

const getDistanceWithId = (id1, id2) => {
    const [r1, c1] = locationIdToPosition(id1)
    const [r2, c2] = locationIdToPosition(id2)
    return Math.abs(r1 - r2) + Math.abs(c1 - c2)
}

// const location_data = await locations(auth_key)
// console.log(makeMap(location_data))
// const simulate_status = await simulate(auth_key, [{ truck_id: 0, command: [1, 1, 1, 5, 2, 2, 6] }])
// const location_data2 = await locations(auth_key)
// console.log(makeMap(location_data2))
