function solution(table, languages, preference) {
    table = setTable(table);
    let keys = Object.keys(table);
    let preferbyjob = new Array(keys.length).fill(0);
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < languages.length; j++) {
            let rank = table[keys[i]].indexOf(languages[j]);
            let score = 0;
            if (rank < 0)
                score = 0;
            else
                score = 5 - rank;
            preferbyjob[i] += score * preference[j];
        }
    }
    
    let jobScore = [];
    for (let i = 0; i < keys.length; i++) {
        jobScore[keys[i]] = preferbyjob[i]
    }

    let max = Math.max(...preferbyjob);
    
    let answers = keys.filter(e => jobScore[e] === max);
    answers.sort();
    return answers[0];
}

function setTable(table) {
    table = table.map(e => e.split(" "));
    t = {};
    for (let i = 0; i < table.length; i++) {
        let key = table[i].shift();
        t[key] = table[i];
    }
    return t;
}

const table = ["SI JAVA JAVASCRIPT SQL PYTHON C#", "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++", "HARDWARE C C++ PYTHON JAVA JAVASCRIPT", "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP", "GAME C++ C# JAVASCRIPT C JAVA"];

let languages = ["JAVA", "JAVASCRIPT"];

let preference = [7, 5];

solution(table, languages, preference)
