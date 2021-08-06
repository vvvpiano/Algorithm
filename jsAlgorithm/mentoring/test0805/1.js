const solution = (board, moves) => {
    let basket = [];
    let stack_board = [];
    let remove_count = 0;
    for (let i = 0; i < board.length; i++) {
        let stack = board.map(line => line[i]).filter(e => e !== 0).reverse();
        stack_board.push(stack);
    }
    // console.log(stack_board);

    const check_basket = () => {
        let last = basket[basket.length - 1];
        let second_last = basket[basket.length - 2];
        if ((last && second_last) && last === second_last) {
            basket.pop();
            basket.pop();
            remove_count += 2;
        }
    }

    const pick = (position) => {
        let doll = stack_board[position - 1].pop();
        if (doll) {
            basket.push(doll);
            check_basket();
        }
    }

    for (let i = 0; i < moves.length; i++) {
        pick(moves[i]);
    }
    // console.log(stack_board);
    // console.log(basket);
    return remove_count;
}
board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]];
moves = [1,5,3,5,1,2,1,4];

console.log(solution(board, moves))
