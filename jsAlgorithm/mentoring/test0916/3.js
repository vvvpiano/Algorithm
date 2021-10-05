class Seller {
    constructor(name, recommender = null) {
        this.name = name
        this.recommender = recommender
        this.profit = 0
    }
}

const solution = (enroll, referral, seller, amount) => {
    const center = new Seller("center")
    const people = {}
    for (let i = 0; i < enroll.length; i++) {
        const recommender = referral[i] === "-" ? center : people[referral[i]]
        people[enroll[i]] = new Seller(enroll[i], recommender)
    }

    for (let i = 0; i < seller.length; i++) {
        const earnPerson = people[seller[i]]
        const originalProfit = amount[i] * 100
        distribute(earnPerson, originalProfit)
    }

    const answer = Object.values(people).map((seller) => seller.profit)
    return answer
}

const distribute = (person, profit) => {
    if (profit <= 0) return
    if (!person.recommender) {
        person.profit += profit
        return
    }
    const fee = Math.floor(profit * 0.1)
    person.profit += profit - fee
    distribute(person.recommender, fee)
}

const test = [
    [
        ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
        ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
        ["young", "john", "tod", "emily", "mary"],
        [12, 4, 2, 5, 10],
    ],
    [
        ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
        ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
        ["sam", "emily", "jaimie", "edward"],
        [2, 3, 5, 4],
    ],
]

test.forEach((t) => {
    console.log(solution(...t))
})
