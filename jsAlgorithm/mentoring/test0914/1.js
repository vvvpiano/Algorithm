const makeVowelWord = (length) => {
    const vowel = ["A", "E", "I", "O", "U"]
    const words = []
    const recursion = (array) => {
        if (array.length === length) {
            words.push(array.join(""))
            return
        }
        for (let i = 0; i < vowel.length; i++) {
            recursion(array.concat([vowel[i]]))
        }
    }
    recursion([])
    return words
}

let dictionary = []
for (let i = 1; i <= 5; i++) {
    dictionary = dictionary.concat(makeVowelWord(i))
}
dictionary.sort()

const solution = (word) => {
    return dictionary.indexOf(word) + 1
}

const test = ["AAAAE", "AAAE", "I", "EIO"]

test.forEach((t) => console.log("answer:", solution(t)))
