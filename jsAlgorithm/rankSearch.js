const database = {
    cpp: {
        backend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
        frontend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
    },
    java: {
        backend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
        frontend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
    },
    python: {
        backend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
        frontend: {
            junior: {
                chicken: [],
                pizza: [],
            },
            senior: {
                chicken: [],
                pizza: [],
            },
        },
    },
}

const sort = () => {
    database.cpp.backend.junior.chicken.sort((a, b) => b - a)
    database.java.backend.junior.chicken.sort((a, b) => b - a)
    database.python.backend.junior.chicken.sort((a, b) => b - a)
    database.cpp.frontend.junior.chicken.sort((a, b) => b - a)
    database.java.frontend.junior.chicken.sort((a, b) => b - a)
    database.python.frontend.junior.chicken.sort((a, b) => b - a)
    database.cpp.backend.senior.chicken.sort((a, b) => b - a)
    database.java.backend.senior.chicken.sort((a, b) => b - a)
    database.python.backend.senior.chicken.sort((a, b) => b - a)
    database.cpp.frontend.senior.chicken.sort((a, b) => b - a)
    database.java.frontend.senior.chicken.sort((a, b) => b - a)
    database.python.frontend.senior.chicken.sort((a, b) => b - a)
    database.cpp.backend.junior.pizza.sort((a, b) => b - a)
    database.java.backend.junior.pizza.sort((a, b) => b - a)
    database.python.backend.junior.pizza.sort((a, b) => b - a)
    database.cpp.frontend.junior.pizza.sort((a, b) => b - a)
    database.java.frontend.junior.pizza.sort((a, b) => b - a)
    database.python.frontend.junior.pizza.sort((a, b) => b - a)
    database.cpp.backend.senior.pizza.sort((a, b) => b - a)
    database.java.backend.senior.pizza.sort((a, b) => b - a)
    database.python.backend.senior.pizza.sort((a, b) => b - a)
    database.cpp.frontend.senior.pizza.sort((a, b) => b - a)
    database.java.frontend.senior.pizza.sort((a, b) => b - a)
    database.python.frontend.senior.pizza.sort((a, b) => b - a)
}

const solution = (info, query) => {
    const answer = []
    for (let i = 0; i < info.length; i++) {
        const [lang, position, career, food, score] = info[i].split(" ")
        database[lang][position][career][food].push(parseInt(score))
    }
    sort()
    for (let i = 0; i < query.length; i++) {
        const keyword = query[i].split(" ").filter((e) => e != "and")
        const score = keyword[4]
        const count = makeQuerys(keyword, score)
        answer.push(count)
    }
    return answer
}

const makeQuerys = (keyword, score) => {
    const types = [
        ["cpp", "java", "python"],
        ["backend", "frontend"],
        ["junior", "senior"],
        ["chicken", "pizza"],
    ]

    const queryKeywords = []
    for (let i = 0; i < 4; i++) {
        if (keyword[i] === "-") queryKeywords[i] = types[i]
        else queryKeywords[i] = [keyword[i]]
    }
    let count = 0
    for (let i = 0; i < queryKeywords[0].length; i++) {
        let lang = queryKeywords[0][i]
        for (let j = 0; j < queryKeywords[1].length; j++) {
            let position = queryKeywords[1][j]
            for (let k = 0; k < queryKeywords[2].length; k++) {
                let career = queryKeywords[2][k]
                for (let l = 0; l < queryKeywords[3].length; l++) {
                    let food = queryKeywords[3][l]
                    count += search([lang, position, career, food], score)
                }
            }
        }
    }
    return count
}

const search = (queryKeyword, score) => {
    const [lang, position, career, food] = queryKeyword
    let scores = database[lang][position][career][food]

    if (scores.length === 0) return 0

    let low = 0
    let high = scores.length
    let answer = -1
    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        if (scores[mid] >= score) {
            answer = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return answer + 1
}

const info = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"]
const query = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"]

console.log("answer:", solution(info, query))
