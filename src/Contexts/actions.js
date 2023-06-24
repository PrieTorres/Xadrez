import * as DEFAULT from './data.js';

export const getBoard = () => {
  const board = DEFAULT.DATA.board;
  let bgColor = DEFAULT.COLORS.bg1;

  DEFAULT.ALPHA_KEYS.forEach((k) => {
    for (let i = 1; i <= 8;  i++) {
      const key = `${k}${i}`;

      board[key].color = bgColor;
      if(bgColor === DEFAULT.COLORS.bg1) {
        bgColor = DEFAULT.COLORS.bg2; 
      } else bgColor = DEFAULT.COLORS.bg1;

      if (i === 2 || i === 7) board[key].piece = DEFAULT.PIECES.peao;
      if (['a1', 'a8', 'h1', 'h8'].includes(key)) board[key].piece = DEFAULT.PIECES.torre;
      if (['b1', 'b8', 'g1', 'g8'].includes(key)) board[key].piece = DEFAULT.PIECES.cavalo;
      if (['c1', 'c8', 'f1', 'f8'].includes(key)) board[key].piece = DEFAULT.PIECES.bispo;
      if (['d1', 'd8'].includes(key)) board[key].piece = DEFAULT.PIECES.rainha;
      if (['e1', 'e8'].includes(key)) board[key].piece = DEFAULT.PIECES.rei;
    }
  });

  return board;
};

const getConsoleBoard = () => {
  const board = getBoard();
  const keys = Object.keys(board);
  let boardConsole = "";
  let count = 0;

  keys.forEach((key) => {
    count++;
    switch(board[key].piece?.id){
      case "peao":
        boardConsole += " ♙ ";
        break;
      case "torre":
        boardConsole += " ♖ ";
        break;
      case "cavalo":
        boardConsole += " ♘ ";
        break;
      case "bispo":
        boardConsole += " ♗ ";
        break;
      case "rainha":
        boardConsole += " ♕ ";
        break;
      case "rei":
        boardConsole += " ♔ ";
        break;
      default: 
        boardConsole += " ";
        break;
    }

    if(count === 8){
      count = 0;
      boardConsole += "\n";
    }
  });

  console.log(boardConsole);
}