const solution = (lines) => {
    let inspection_timings = [];
    let requests = [];
    lines.forEach(line => {
        let info = line.split(' ');
        let [start_time, end_time] = get_start_end_time_to_ms(info[1], info[2].substr(0, info[2].length - 1));
        inspection_timings.push(start_time, end_time);
        requests.push({
            start: start_time,
            end: end_time
        })
    });

    let max = 0;
    for (let i = 0; i < inspection_timings.length; i++) {
        let window_start = inspection_timings[i];
        let traffics = count_traffic(window_start, requests);
        if (max < traffics)
            max = traffics;
    }
    return max;
}

const get_start_end_time_to_ms = (end_time, process_time) => {
    let time_info = end_time.split(':');
    let second_info = time_info.pop();
    time_info.push(...second_info.split('.'));
    time_info = time_info.map(Number);
    const end_ms = to_ms(...time_info);
    let process_time_info = process_time.split('.').map(Number);
    const start_ms = end_ms - to_ms(0, 0, process_time_info[0], process_time_info[1] || 0) + 1;
    return [start_ms, end_ms];
}

const to_ms = (hour, minute, second, ms) => {
    const SECOND_TO_MS = 1000;
    const MINITE_TO_MS = SECOND_TO_MS * 60;
    const HOUR_TO_MS = MINITE_TO_MS * 60;
    let total_ms = ms;
    total_ms += second * SECOND_TO_MS;
    total_ms += minute * MINITE_TO_MS;
    total_ms += hour * HOUR_TO_MS;
    return total_ms;
}

const count_traffic = (window_start, requests) => {
    let window_end = window_start + 1000 - 1;
    let count = 0;
    for (let i = 0; i < requests.length; i++) {
        if (requests[i].end < window_start || window_end < requests[i].start)
            continue;
        count++;
    }
    return count;
}

let lines = [
    "2016-09-15 20:59:57.421 0.351s",
    "2016-09-15 20:59:58.233 1.181s",
    "2016-09-15 20:59:58.299 0.8s",
    "2016-09-15 20:59:58.688 1.041s",
    "2016-09-15 20:59:59.591 1.412s",
    "2016-09-15 21:00:00.464 1.466s",
    "2016-09-15 21:00:00.741 1.581s",
    "2016-09-15 21:00:00.748 2.31s",
    "2016-09-15 21:00:00.966 0.381s",
    "2016-09-15 21:00:02.066 2.62s"
];


console.log(solution(lines));