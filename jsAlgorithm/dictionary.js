const solution = (word) => {
    const vowel = ["A", "E", "I", "O", "U"]
    let dictionary = []
    const wordByLength = [["A", "E", "I", "O", "U"]]
    for (let i = 1; i <= 4; i++) {
        const newWords = []
        vowel.forEach((v) => newWords.push(wordByLength[i - 1].map((word) => v + word)))
        wordByLength[i] = []
        newWords.forEach((e) => (wordByLength[i] = wordByLength[i].concat(e)))
    }
    wordByLength.forEach((e) => (dictionary = dictionary.concat(e)))
    dictionary.sort()
    return dictionary.indexOf(word) + 1
}

console.log(solution("AAAAE"))
