import { getBoard } from "./actions.js"
import { calcBispoMoves, calcHorseMoves, calcKingMoves, calcPeaoMoves, calcQueenMoves, calcTowerMoves } from "./moves.js"
const black_peao =  "/pieces/black_peao.png";
const black_horse = "/pieces/black_horse.png";
const black_king =  "/pieces/black_king.png";
const black_queen = "/pieces/black_queen.png";
const black_tower = "/pieces/black_tower.png";
const black_bispo = "/pieces/black_bispo.png";
const white_peao =  "/pieces/white_peao.png";
const white_horse = "/pieces/white_horse.png";
const white_king =  "/pieces/white_king.png";
const white_queen = "/pieces/white_queen.png";
const white_tower = "/pieces/white_tower.png";
const white_bispo = "/pieces/white_bispo.png";

const def = {
  killMove: false,
  mayMove: false
}

export const ALPHA_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const COLORS = {
  bg1: "#000",
  bg2: "#eee",
  mayMove: "#38afda",
  killMove: "#da3851",
  black: "black",
  white: "white"
}

const getOtherPlayerColor = (playerSide) => {
  return playerSide == COLORS.white ? COLORS.black : COLORS.white;
}

export const DATA = {
  board: {
    a8: { ...def }, b8: { ...def }, c8: { ...def }, d8: { ...def }, e8: { ...def }, f8: { ...def }, g8: { ...def }, h8: { ...def },
    a7: { ...def }, b7: { ...def }, c7: { ...def }, d7: { ...def }, e7: { ...def }, f7: { ...def }, g7: { ...def }, h7: { ...def },
    a6: { ...def }, b6: { ...def }, c6: { ...def }, d6: { ...def }, e6: { ...def }, f6: { ...def }, g6: { ...def }, h6: { ...def },
    a5: { ...def }, b5: { ...def }, c5: { ...def }, d5: { ...def }, e5: { ...def }, f5: { ...def }, g5: { ...def }, h5: { ...def },
    a4: { ...def }, b4: { ...def }, c4: { ...def }, d4: { ...def }, e4: { ...def }, f4: { ...def }, g4: { ...def }, h4: { ...def },
    a3: { ...def }, b3: { ...def }, c3: { ...def }, d3: { ...def }, e3: { ...def }, f3: { ...def }, g3: { ...def }, h3: { ...def },
    a2: { ...def }, b2: { ...def }, c2: { ...def }, d2: { ...def }, e2: { ...def }, f2: { ...def }, g2: { ...def }, h2: { ...def },
    a1: { ...def }, b1: { ...def }, c1: { ...def }, d1: { ...def }, e1: { ...def }, f1: { ...def }, g1: { ...def }, h1: { ...def },
  },
  playerSide: "white",
  capturedPieces: {
    white: [],
    black: []
  }
}

DATA.otherPlayerSide = getOtherPlayerColor(DATA.playerSide);

export const boardKeys = Object.keys(DATA.board);

export const PIECES = {
  peao: {
    id: "peao",
    calcMoves: calcPeaoMoves,
    firstMove: true,
    icon: "♙",
    white_icon: white_peao,
    black_icon: black_peao,
  },
  torre: {
    id: "torre",
    calcMoves: calcTowerMoves,
    icon: "♖",
    white_icon: white_tower,
    black_icon: black_tower,
  },
  bispo: {
    id: "bispo",
    calcMoves: calcBispoMoves,
    icon: "♗",
    white_icon: white_bispo,
    black_icon: black_bispo,
  },
  cavalo: {
    id: "cavalo",
    calcMoves: calcHorseMoves,
    icon: "♘",
    white_icon: white_horse,
    black_icon: black_horse,
  },
  rei: {
    id: "rei",
    calcMoves: calcKingMoves,
    icon: "♔",
    white_icon: white_king,
    black_icon: black_king,
  },
  rainha: {
    id: "rainha",
    calcMoves: calcQueenMoves,
    icon: "♕",
    white_icon: white_queen,
    black_icon: black_queen,
  }
}

Object.freeze(PIECES);
Object.freeze(PIECES.peao);
Object.freeze(PIECES.cavalo);
Object.freeze(PIECES.torre);
Object.freeze(PIECES.bispo);
Object.freeze(PIECES.rainha);
Object.freeze(PIECES.rei);
Object.freeze(ALPHA_KEYS);
Object.freeze(boardKeys);


export const data = {
  ...DATA,
  board: getBoard()
}
