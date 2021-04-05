function solution(gift_cards, wants) {
    
    let answer = 0;
    let gift_cards_count = setGiftCardsCount(gift_cards);
    for (let i = 0; i < wants.length; i++) {
        let current_want = wants[i];
        if (!gift_cards_count[current_want])
            answer++;
        else {
            gift_cards_count[current_want]--;
        }
    }
    return answer;
}

const setGiftCardsCount = (gift_cards) => {
    let gift_cards_count = {};
    for (let i = 0; i < gift_cards.length; i++) {
        if (gift_cards_count[gift_cards[i]])
            gift_cards_count[gift_cards[i]]++;
        else
            gift_cards_count[gift_cards[i]] = 1;
    }
    return gift_cards_count;
}

const gift_cards = [5, 4, 5, 4, 5];
const wants = 	[1, 2, 3, 5, 4];

console.log(solution(gift_cards, wants));