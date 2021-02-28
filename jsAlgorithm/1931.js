const { time } = require('console');
const fs = require('fs')
const input = fs.readFileSync('./test.txt').toString().trim().split('\n')
const N = input.shift();
let timetable = input.map(e => {
    return {
        start: parseInt(e.split(' ')[0]),
        end: parseInt(e.split(' ')[1])
    }
})

timetable.sort((a, b) => {
    if (a.end !== b.end)
        return a.end - b.end
    else
        return a.start - b.start
})

let count = 1;
let lastAgenda = timetable[0]
for (let i = 1; i < timetable.length; i++) {
    let endTime = lastAgenda.end;
    if (timetable[i].start >= endTime) {
        count++;
        lastAgenda = timetable[i]
    }
}
console.log(count)