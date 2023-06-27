import { useContext, useEffect } from "react";
import { XadrezContext } from "../../Contexts/context";
import { COLORS, boardKeys } from "../../Contexts/data";
import * as types from '../../Contexts/types';
import { clearMayMoves } from "../../Contexts/actions";
import { killMove, simpleMove } from "../../Contexts/moves";

export const Tabuleiro = () => {
  const _XadrezContext = useContext(XadrezContext);
  const { xadrezState, xadrezDispatch } = _XadrezContext;
  const { board } = xadrezState;

  return (
    <div className="board">
      {xadrezState.win ?
        <div id="win-game" onClick={() => xadrezDispatch({ type: types.INITIAL })}>Vitória das {xadrezState.win}</div>
        : undefined
      }
      <div style={{ display: "flex", flexWrap: "wrap", width: "360px", justifyContent: "center" }}>
        {boardKeys.map((key) => {
          const square = board[key];
          return (
            <div
              id={key}
              key={key}
              style={{
                height: "40px",
                width: "40px",
                backgroundColor: square.killMove || square.mayMove || square.color,
                border: "1px solid #777",
                fontFamily: "monospace",
                fontSize: "2rem",
                textShadow: "0px 2px 3px #fff"
              }}
              onClick={() => {
                if (board.clickedPiece && square.killMove) return xadrezDispatch({ type: types.CAPTURE_PIECE, payload: killMove(board, board.clickedPiece, key) });
                if (square.piece && square.piece.color !== xadrezState.playerSide) return;
                if (!square.piece) return xadrezDispatch({ type: types.MOVE_PIECE, payload: simpleMove(board, board.clickedPiece, key) });

                clearMayMoves(board);
                if (board.clickedPiece != key) {
                  board.clickedPiece = key;
                  xadrezDispatch({ type: types.CHANGE_BOARD, payload: square.piece.calcMoves(board, key, COLORS.white === square.piece.color) });
                } else {
                  delete board.clickedPiece;
                  xadrezDispatch({ type: types.CHANGE_BOARD, payload: board });
                }
              }}
            >
              {
                square.piece ?
                  <img
                    src={square.piece.color === COLORS.white ?
                      square.piece.white_icon : square.piece.black_icon
                    }
                    style={{ width: "100%", height: "100%" }}
                  />
                  : undefined
              }
            </div>
          )
        })
        }</div>
    </div>
  );
}