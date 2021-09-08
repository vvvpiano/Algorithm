const pages = [
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
]

class Page {
    constructor(no) {
        this.no = no
        this.url = null
        this.basicScore = null
        this.linkScore = null
        this.extraScore = null
        this.matchingScore = null
        this.linkedPages = []
        this.linkTo = null
    }
}

function solution(word, pages) {
    word = word.toLowerCase()
    const pageNodes = []
    for (let i = 0; i < pages.length; i++) {
        const pageContents = pages[i]
        pageNodes[i] = new Page(i)
        pageNodes[i].url = getUrl(pageContents)
        // const bodyContents = parseBody(pageContents)
        pageNodes[i].linkTo = getLinkTo(pageContents)
        pageNodes[i].basicScore = getBasicScore(word, pageContents)
    }

    for (let i = 0; i < pageNodes.length; i++) {
        const linkTo = pageNodes[i].linkTo
        linkTo.forEach((e) => {
            for (let j = 0; j < pageNodes.length; j++) {
                const page = pageNodes[j]
                if (page.url === e) {
                    page.linkedPages.push(i)
                }
            }
        })
    }

    pageNodes.forEach((page) => {
        page.extraScore = page.basicScore / page.linkTo.length
    })

    let answer = 0
    for (let i = 0; i < pageNodes.length; i++) {
        calculateMatchingScore(i, pageNodes)
        if (pageNodes[answer].matchingScore < pageNodes[i].matchingScore) answer = i
        console.log(pageNodes[i])
    }
    return answer
}

const parseHead = (content) => {
    const startBody = content.indexOf("<head>")
    const endBody = content.indexOf("</head>")
    const headContents = content.substr(startBody + 6, endBody - startBody - 6)
    return headContents
}

const getUrl = (pageContents) => {
    const content = parseHead(pageContents)
    let metaTags = parseTag("<meta", ">", content)
    let url
    metaTags.forEach((e) => {
        if (e.includes('property="og:url"')) url = e.match(/https?:\/\/[\w\-\.]+/g)[0]
    })
    return url
}

// const parseBody = (content) => {
//     const startBody = content.indexOf("<body>")
//     const endBody = content.indexOf("</body>")
//     const bodyContents = content.substr(startBody + 6, endBody - startBody - 6)
//     return bodyContents
// }

// const parseAtag = (content) => {
//     let i = 0
//     let aTags = []
//     let bodyTexts = []
//     while (i < content.length) {
//         // let str = content.slice(i, content.length)
//         const startATag = content.indexOf("<a href", i)
//         if (startATag < 0) break
//         bodyTexts.push(content.slice(i, startATag))
//         const endATag = content.indexOf("</a>", i) + 4
//         aTags.push(content.slice(startATag, endATag))
//         // console.log("bodyTexts:", bodyTexts)
//         // console.log("aTags:", aTags)
//         i = endATag
//     }
//     bodyTexts.push(content.slice(i, content.length))
//     // console.log(bodyTexts)
//     return [aTags, bodyTexts]
// }

const parseTag = (startTag, endTag, content) => {
    let i = 0
    let metaTags = []
    while (i < content.length) {
        const startTagIndex = content.indexOf(startTag, i)
        if (startTagIndex < 0) break
        const endTagIndex = content.indexOf(endTag, startTagIndex) + endTag.length
        metaTags.push(content.slice(startTagIndex, endTagIndex))
        i = endTagIndex
    }
    return metaTags
}

const getLinkTo = (pageContents) => {
    const aTags = parseTag("<a href", "</a>", pageContents)
    const linkTo = []
    aTags.forEach((e) => linkTo.push(e.match(/https?:\/\/[\w\-\.]+/g)[0]))
    return linkTo
}

const getBasicScore = (word, bodyContents) => {
    let score = 0
    const flatStrings = flattenString(bodyContents)
        .split(" ")
        .filter((e) => e.length !== 0)
    flatStrings.forEach((e) => {
        if (e === word) score++
    })
    return score
}

const flattenString = (str) => {
    str = str.toLowerCase()
    const flattenedString = [...str]
    for (let i = 0; i < flattenedString.length; i++) {
        const char = flattenedString[i]
        if (!("a" <= char && char <= "z")) {
            flattenedString[i] = " "
        }
    }
    return flattenedString.join("")
}

const calculateMatchingScore = (index, pageNodes) => {
    const target = pageNodes[index]
    let linkScore = 0
    target.linkedPages.forEach((e) => {
        linkScore += pageNodes[e].extraScore
    })
    target.linkScore = linkScore
    target.matchingScore = target.basicScore + target.linkScore
}

console.log("answer:", solution("Muzi", pages))
