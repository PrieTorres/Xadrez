import { recalcPlayerSide } from './actions.js';
import { COLORS, DATA, data } from './data.js';
import * as types from './types.js';

export const xadrezReducer = (state, action) => {
  switch (action.type) {
    case types.MOVE_PIECE: {
      const playerSide = state.playerSide === COLORS.white ? COLORS.black : COLORS.white;
      return { ...state, board: { ...recalcPlayerSide(action.payload, playerSide) }, playerSide };
    }
    case types.CHANGE_BOARD: {
      return { ...state, board: { ...action.payload } };
    }
    case types.CAPTURE_PIECE: {
      const { capturedPiece } = action.payload;
      const playerSide = state.playerSide === COLORS.white ? COLORS.black : COLORS.white;
      let _capturedPieces = state.capturedPieces;
      _capturedPieces[capturedPiece.color].push(capturedPiece);

      return {
        ...state,
        playerSide,
        board: { ...recalcPlayerSide(action.payload.board, playerSide) },
        win: capturedPiece.id === "rei"? state.playerSide : false,
        capturedPieces: {
          ..._capturedPieces
        }
      };
    }
    case types.CHANGE_SIDE: {
      //animação aqui??
      return { ...state, playerSide: action.payload };
    }
    case types.INITIAL: {
      return { ...data }
    }
  }

  console.log("action nao encontrada", action, state)
  return { ...state };
};
