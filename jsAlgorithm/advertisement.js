const solution = (play_time, adv_time, logs) => {
    const playSeconds = convertToSeconds(play_time)
    const adsSeconds = convertToSeconds(adv_time)
    const playerPerSecond = new Array(playSeconds + 1).fill(0)
    for (let i = 0; i < logs.length; i++) {
        const [start, end] = logs[i].split("-")
        playerPerSecond[convertToSeconds(start)] += 1
        playerPerSecond[convertToSeconds(end)] -= 1
    }
    // 누적합을 이용하여 각 초에 몇 명의 시청자가 있는지 계산
    for (let i = 1; i <= playSeconds; i++) {
        playerPerSecond[i] += playerPerSecond[i - 1]
    }
    // 다시 한 번 누적합을 이용하여 각 초마다 몇 명의 누적 시청자가 보았는지 계산
    for (let i = 1; i <= playSeconds; i++) {
        playerPerSecond[i] += playerPerSecond[i - 1]
    }

    let max = 0
    let maxPoint = 0
    let startPoint = 0
    while (startPoint + adsSeconds <= playSeconds) {
        let cumulPlayer = playerPerSecond[startPoint + adsSeconds] - playerPerSecond[startPoint]
        if (cumulPlayer > max) {
            maxPoint = startPoint
            max = cumulPlayer
        }
        startPoint++
    }
    return convertToTimeString(maxPoint)
}

const convertToSeconds = (timeString) => {
    const [h, m, s] = timeString.split(":")
    return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s)
}

const convertToTimeString = (seconds) => {
    const hour = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0")
    seconds = seconds % 3600
    const minute = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")
    const second = (seconds % 60).toString().padStart(2, "0")
    return `${hour}:${minute}:${second}`
}

const test = [
    ["02:03:55", "00:14:15", ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]],
    ["99:59:59", "25:00:00", ["69:59:59-89:59:59", "01:00:00-21:00:00", "79:59:59-99:59:59", "11:00:00-31:00:00"]],
    ["50:00:00", "50:00:00", ["15:36:51-38:21:49", "10:14:18-15:36:51", "38:21:49-42:51:45"]],
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(...test[i]))
}
