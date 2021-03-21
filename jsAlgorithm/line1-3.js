function solution(enter, leave) {
    var answer = findIncludes(enter, leave);
    return answer
}

function findIncludes(enter, leave) {
    let timelines = [];
    for (let i = 1; i <= enter.length; i++) {
        let iEnter = enter.indexOf(i);
        let iLeave = enter.length + leave.indexOf(i);
        timelines.push([iEnter, iLeave]);
    }
    console.log("timeline",timelines);

    let includes = enter.map(e => []);
    let includeds = enter.map(e => []);
    for (let i = 0; i < enter.length; i++) {
        for (let j = 0; j < enter.length; j++) {
            if (i === j)
                continue;
            if (isInclude(timelines[i], timelines[j])) {
                includes[i].push(j);
                includeds[j].push(i);
            }
        }
    }
    console.log(includes);
    console.log(includeds);

    for (let i = 0; i < includeds.length; i++) {
        let included = includeds[i];
        if (included.length > 1) {
            for (let j = 0; j < included.length; j++) {
                let exceptme = included.filter(e => e !== included[j]);
                console.log(exceptme);
                exceptme.forEach(e => {
                    console.log(e)
                    includes[e].push(included[j]);
                });
            }
        }
    }
    let answer = includes.map(e => e.length);
    let answer2 = includeds.map(e => e.length);
    let real = [];
    for (let i = 0; i < answer.length; i++) {
        real.push(answer[i] + answer2[i]);
    }
    // console.log(real);
}

function isInclude(out, inner) {
    if (out[0] < inner[0] && inner[1] < out[1])
        return true;
    return false;
}

const enter = [1,4,2,3];
const leave = [2,1,3,4];
findIncludes(enter, leave);