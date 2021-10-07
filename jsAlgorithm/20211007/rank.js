class Player {
    constructor(no) {
        this.no = no
        this.stronger_player = []
        this.weaker_player = []
        this.rank
    }
}

function solution(n, results) {
    const players = new Array(n + 1)
    for (let i = 1; i <= n; i++) {
        players[i] = new Player(i)
    }
    results.forEach(([win, lose]) => {
        players[win].weaker_player.push(lose)
        players[lose].stronger_player.push(win)
    })

    const bfs = (no, type) => {
        let result = []
        const is_visited = new Array(n + 1).fill(0)
        const queue = [no]
        while (queue.length > 0) {
            const number = queue.shift()
            const player = players[number]
            if (is_visited[number] === 1) continue
            is_visited[number] = 1
            if (number !== no) result.push(number)
            for (let i = 0; i < player[type].length; i++) {
                if (is_visited[player[type][i]] === 1) continue
                queue.push(player[type][i])
            }
        }
        players[no][type] = result
    }

    let answer = 0
    for (let i = 1; i <= n; i++) {
        bfs(i, "weaker_player")
        bfs(i, "stronger_player")
        // console.log(players[i])
        if (players[i].weaker_player.length + players[i].stronger_player.length === n - 1) answer++
    }
    return answer
}
