const solution = (fees, records) => {
    const [basicTime, basicFee, unitTime, unitFee] = fees
    const maxTime = convertToMinutes("23:59")
    const parkingLot = []
    const feeRecords = {}
    records.forEach((record) => {
        let [time, car, status] = record.split(" ")
        time = convertToMinutes(time)

        if (status === "IN") {
            parkingLot.push([car, time])
        } else if (status === "OUT") {
            const removeIndex = findIndex(car, parkingLot)
            const outCar = parkingLot.splice(removeIndex, 1)[0]
            const timeInUse = time - outCar[1]
            if (feeRecords[car]) feeRecords[car] += timeInUse
            else feeRecords[car] = timeInUse
        }
    })
    if (parkingLot.length > 0) {
        let i = 0
        while (i < parkingLot.length) {
            const [car, inTime] = parkingLot[i++]
            const timeInUse = maxTime - inTime
            if (feeRecords[car]) feeRecords[car] += timeInUse
            else feeRecords[car] = timeInUse
        }
    }
    const cars = Object.keys(feeRecords).sort((a, b) => a - b)
    const answer = cars.map((car) => {
        const totalTime = feeRecords[car]
        if (totalTime <= basicTime) return basicFee
        else return basicFee + Math.ceil((totalTime - basicTime) / unitTime) * unitFee
    })
    return answer
}

const findIndex = (car, parkingLot) => {
    for (let i = 0; i < parkingLot.length; i++) {
        if (parkingLot[i][0] === car) return i
    }
    return -1
}

const convertToMinutes = (timeString) => {
    const [hour, minute] = timeString.split(":").map(Number)
    return hour * 60 + minute
}

const test = [
    [
        [180, 5000, 10, 600],
        ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"],
    ],
    [
        [120, 0, 60, 591],
        ["16:00 3961 IN", "16:00 0202 IN", "18:00 3961 OUT", "18:00 0202 OUT", "23:58 3961 IN"],
    ],
    [[1, 461, 1, 10], ["00:00 1234 IN"]],
]

test.forEach((t) => console.log("answer:", solution(...t)))
