const solution = (m, musicinfos) => {
    const melody_arr = parse_notes(m);
    musicinfos = musicinfos.map(info => parse_musicinfos(info));
    const answer = [];
    for (let i = 0; i < musicinfos.length; i++) {
        const [play_time, title, actual_notes] = musicinfos[i];
        if (melody_arr.length > play_time)
            continue;
        if (is_submelody(melody_arr, actual_notes))
            answer.push([title, play_time]);
    }
    if (answer.length === 0)
        return "(None)";
    answer.sort((a, b) => b[1] - a[1])
    return answer[0][0];
}

const parse_musicinfos = (musicinfo) => {
    const [start, end, title, notes] = musicinfo.split(',');
    const play_time = get_minutes(end) - get_minutes(start);
    const actual_notes = get_actual_play(play_time, parse_notes(notes));
    return [play_time, title, actual_notes];
}

const get_minutes = (time_string) => {
    let [hour, minute] = time_string.split(':').map(Number);
    return hour * 60 + minute;
}

const parse_notes = (notes) => {
    const note_array = [];
    let i = 0;
    while (i < notes.length) {
        if (notes.charAt(i + 1) === '#') {
            note_array.push(notes.substr(i, 2));
            i += 2;
        } else {
            note_array.push(notes.charAt(i));
            i += 1;
        }
    }
    return note_array;
}

const get_actual_play = (play_time, note_array) => {
    let actual_notes = [];
    let count = Math.floor(play_time / note_array.length)
    while (count-- > 0) {
        actual_notes = [...actual_notes, ...note_array];
    }
    actual_notes = [...actual_notes, ...note_array.slice(0, play_time % note_array.length)];
    return actual_notes;
}

const is_submelody = (melody, notes) => {
    let i = 0;
    let m = melody.join("");
    while (i < notes.length - melody.length + 1) {
        if (m == notes.slice(i, i + melody.length).join(""))
            return true;
        i++;
    }
    return false;
}

const test = [
    ["ABCDEFG", ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"]],
    ["CC#BCC#BCC#BCC#B", ["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"]],
    ["ABC", ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"]]
]

for (let i = 0; i < test.length; i++) {
    console.log(solution(...test[i]));
}