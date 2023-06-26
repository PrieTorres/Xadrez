import * as types from './types.js';

export const xadrezReducer = (state, action) => {
  switch (action.type) {
    case types.MOVE_PIECE: {
      return { ...state, board: action.payload };
      break;
    }
    case types.CHANGE_SIDE: {
      //animação aqui??
      return { ...state, playerSide: action.payload };
      break;
    }
    case types.INITIAL: {
      return { ...state, ...action.payload }
    }
  }

  console.log("action nao encontrada", action.type)
  return { ...state };
};
