import { getBoard } from "./actions.js"
import { calcBispoMoves, calcHorseMoves, calcKingMoves, calcPeaoMoves, calcQueenMoves, calcTowerMoves } from "./moves.js"

const def = {
  killMove: false,
  mayMove: false
}

export const data = {
  ...DATA,
  board: getBoard();
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

export const PIECES = {
  peao: {
    id: "peao",
    move: calcPeaoMoves
  },
  torre: {
    id: "torre",
    move: calcTowerMoves
  },
  bispo: {
    id: "bispo",
    move: calcBispoMoves
  },
  cavalo: {
    id: "cavalo",
    move: calcHorseMoves
  },
  rei: {
    id: "rei",
    move: calcKingMoves
  },
  rainha: {
    id: "rainha",
    move: calcQueenMoves
  }
}

export const COLORS = {
    bg1: "#000",
    bg2: "#eee"
}

export const ALPHA_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];
