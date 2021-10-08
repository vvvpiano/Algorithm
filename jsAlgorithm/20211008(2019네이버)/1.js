const solution = (record) => {
    let permanent_storage = []
    let temp_storage = []

    record.forEach((r) => {
        const data = r.split(" ")
        switch (data[0]) {
            case "RECEIVE": {
                temp_storage.push(data[1])
                break
            }
            case "DELETE": {
                temp_storage.pop()
                break
            }
            case "SAVE": {
                permanent_storage = permanent_storage.concat(temp_storage)
                temp_storage = []
            }
        }
        console.log("temp:", temp_storage)
        console.log("permanent:", permanent_storage)
    })
    return permanent_storage
}

const test = [
    // ["RECEIVE abcd@naver.com"],
    ["RECEIVE abcd@naver.com", "RECEIVE zzkn@naver.com", "DELETE", "RECEIVE qwerty@naver.com", "SAVE", "RECEIVE QwerTY@naver.com"],
    ["RECEIVE abcd@naver.com", "RECEIVE zzkn@naver.com", "DELETE", "RECEIVE qwerty@naver.com", "SAVE", "SAVE", "DELETE", "RECEIVE QwerTY@naver.com", "SAVE"],
]

test.forEach((t) => console.log("answer:", solution(t)))
