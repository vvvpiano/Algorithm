const solution = (board) => {
  printBoard(board)
}

const printBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(""))
  }
}

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 4, 0, 0, 0],
  [0, 0, 0, 2, 3, 0, 0, 0, 5, 5],
  [1, 2, 2, 2, 3, 3, 0, 0, 0, 5],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
]
console.log(solution(board))
