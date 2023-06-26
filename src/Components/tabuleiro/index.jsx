import { useContext, useEffect } from "react";
import { XadrezContext } from "../../Contexts/context";
import { COLORS } from "../../Contexts/data";


export const Tabuleiro = () => {
  const _XadrezContext = useContext(XadrezContext);
  const { xadrezState, xadrezDispatch } = _XadrezContext;
  const { board } = xadrezState;
  const tableKeys = Object.keys(board);

  return (
    <div className="board">
      <div style={{ display: "flex", flexWrap: "wrap", width: "360px", justifyContent: "center" }}>

        {
          tableKeys.map((key) => {
            const square = board[key];
            return (
              <div id={key} key={key} style={{ height: "40px", width: "40px", backgroundColor: square.color, border: "1px solid black", fontFamily: "monospace", fontSize: "2rem", textShadow: "0px 2px 3px #fff" }}>
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
        }
      </div>
    </div>
  );
}