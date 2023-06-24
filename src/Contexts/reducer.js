import * as types from './types';

export const xadrezReducer = (state, action) => {
  switch (action.type) {
    case types.MOVE_PIECE: {
      return { ...state, board: action.payload };
    }
    case types.CHANGE_SIDE: {
      //animação aqui??
      return { ...state, playerSide: action.payload };
    }
  }

  console.log("action nao encontrada", action.type)
  return { ...state };
};
