function parseSearch(search) {
    if (search.length === 0)
        return {};
    search = search.slice(1, search.length);
    let key_value_pair = search.split("&");

    const key_value = {};
    key_value_pair.forEach(pair => {
        const [key, value] = pair.split("=");
        if (key_value[key]) {
            key_value[key] = [...key_value[key], value];
        } else {
            key_value[key] = [value];
        }
    });
    
    const keys = Object.keys(key_value);
    keys.forEach(key => {
        if (key_value[key].length === 1) {
            key_value[key] = key_value[key][0];
        }
    });
    return key_value;
}

/*
 * NOTE: 아래 코드는 코드 동작을 확인하기 위한 코드입니다. 수정하지 말아주세요.
 */
function solution(search) {
    var query = parseSearch(search);
    return submit(query);
}

function submit(answer) {
    return JSON.stringify(answer);
}

console.log(solution("?from=twitter"));