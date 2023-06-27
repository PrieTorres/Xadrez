import * as DEFAULT from './data.js';
import * as types from "./types.js";

export const setInitialData = (dispatch) => {
  return () => dispatch({ type: types.INITIAL, payload: DEFAULT.data });
}

export const recalcPlayerSide = (_board, playerSideColor) => {
  const board = { ..._board }

  DEFAULT.boardKeys.forEach((key) => {
    if (board[key].piece) {
      board[key].piece.playerSide = board[key].piece.color == playerSideColor;
    }
  });

  return board;
}

export const clearMayMoves = (_board) => {
  const board = { ..._board }
  for (const letter of DEFAULT.ALPHA_KEYS) {
    for (let number = 1; number <= 8; number++) {
      const key = `${letter}${number}`;

      board[key].mayMove = false;
      board[key].killMove = false;
    }
  };

  return board;
}

const setPiecesColors = (board, playerSideColor, otherPlayerSideColor) => {
  for (const letter of DEFAULT.ALPHA_KEYS) {
    for (let number = 1; number <= 8; number++) {
      const key = `${letter}${number}`;

      if (board[key].piece) {
        if (number <= 2) {
          board[key].piece.color = playerSideColor;
        }
        if (number >= 7) {
          board[key].piece.color = otherPlayerSideColor;
        }
      }

      if (board[key].piece) {
        board[key].piece.playerSide = board[key].piece.color == playerSideColor;
      }
    }

  };

  return board;
}

export const getBoard = () => {
  const board = DEFAULT.DATA.board;
  let bgColor = DEFAULT.COLORS.bg1;

  for (const letter of DEFAULT.ALPHA_KEYS) {
    for (let number = 1; number <= 8; number++) {
      const key = `${letter}${number}`;

      board[key].color = bgColor;
      if (bgColor === DEFAULT.COLORS.bg1) {
        bgColor = DEFAULT.COLORS.bg2;
      } else bgColor = DEFAULT.COLORS.bg1;

      if (number === 2 || number === 7) {
        board[key].piece = { ...DEFAULT.PIECES.peao };
      }
      if (['a1', 'a8', 'h1', 'h8'].includes(key)) {
        board[key].piece = { ...DEFAULT.PIECES.torre };
      }
      if (['b1', 'b8', 'g1', 'g8'].includes(key)) {
        board[key].piece = { ...DEFAULT.PIECES.cavalo };
      }
      if (['c1', 'c8', 'f1', 'f8'].includes(key)) {
        board[key].piece = { ...DEFAULT.PIECES.bispo };
      }
      if (['d1', 'd8'].includes(key)) {
        board[key].piece = { ...DEFAULT.PIECES.rainha };
      }
      if (['e1', 'e8'].includes(key)) {
        board[key].piece = { ...DEFAULT.PIECES.rei };
      }

    }

    if (bgColor === DEFAULT.COLORS.bg1) {
      bgColor = DEFAULT.COLORS.bg2;
    } else bgColor = DEFAULT.COLORS.bg1;
  };

  return setPiecesColors(board, DEFAULT.DATA.playerSide, DEFAULT.DATA.otherPlayerSide);
};

const getConsoleBoard = () => {
  const board = getBoard();
  const keys = Object.keys(board);
  let boardConsole = "";
  let count = 0;

  keys.forEach((key) => {
    count++;
    switch (board[key].piece?.id) {
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

    if (count === 8) {
      count = 0;
      boardConsole += "\n";
    }
  });

  console.log(boardConsole);
}
