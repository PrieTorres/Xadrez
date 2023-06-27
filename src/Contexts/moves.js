import { clearMayMoves } from "./actions.js";
import { ALPHA_KEYS, COLORS } from "./data.js";

export const simpleMove = (_board, fromKey, goingToKey) => {
    let board = { ..._board };

    if (!board[fromKey].piece) return _board;

    if (board[goingToKey].mayMove) {
        board[goingToKey].piece = { ...board[fromKey].piece, firstMove: false };
        delete board[fromKey].piece;
    }

    board = clearMayMoves(board);

    return board;
}

export const killMove = (_board, fromKey, goingToKey) => {
    let board = { ..._board };
    let capturedPiece;

    if (!board[fromKey].piece) return _board;

    if (board[goingToKey].killMove) {
        capturedPiece = { ...board[goingToKey].piece };
        delete board[goingToKey].piece;

        board[goingToKey].piece = { ...board[fromKey].piece, firstMove: false };
        delete board[fromKey].piece;
    }

    board = clearMayMoves(board);

    return { board, capturedPiece };
}

const colorMoves = (board, posibilityMoves, killMoves) => {
    posibilityMoves.forEach(key => {
        board[key].mayMove = COLORS.mayMove;
    });
    killMoves.forEach(key => {
        board[key].killMove = COLORS.killMove;
    });
}

export const calcPeaoMoves = (_board, position, playerSide = true) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const board = _board;
    const posibilityMoves = [];
    const killMoves = [];

    const indexOfLetter = ALPHA_KEYS.indexOf(letter);
    const diagonal_up_right = `${ALPHA_KEYS[indexOfLetter - 1]}${number + 1}`;
    const diagonal_up_left = `${ALPHA_KEYS[indexOfLetter + 1]}${number + 1}`;
    const diagonal_down_right = `${ALPHA_KEYS[indexOfLetter + 1]}${number - 1}`;
    const diagonal_down_left = `${ALPHA_KEYS[indexOfLetter - 1]}${number - 1}`;


    if (playerSide) {
        if (!board[`${letter}${number + 1}`].piece) posibilityMoves.push(`${letter}${number + 1}`);
        if (board[position].piece.firstMove) posibilityMoves.push(`${letter}${number + 2}`);

        if (board[diagonal_up_right]?.piece && !board[diagonal_up_right].piece.playerSide) {
            killMoves.push(diagonal_up_right);
        }
        if (board[diagonal_up_left]?.piece && !board[diagonal_up_left].piece.playerSide) {
            killMoves.push(diagonal_up_left);
        }
    } else {
        if (!board[`${letter}${number - 1}`].piece) posibilityMoves.push(`${letter}${number - 1}`);
        if (board[position].piece.firstMove) posibilityMoves.push(`${letter}${number - 2}`);

        if (board[diagonal_down_right]?.piece && board[diagonal_down_right].piece.playerSide) {
            killMoves.push(diagonal_down_right);
        }
        if (board[diagonal_down_left]?.piece && board[diagonal_down_left].piece.playerSide) {
            killMoves.push(diagonal_down_left);
        }
    }

    colorMoves(board, posibilityMoves, killMoves);

    return board;
}

export const calcTowerMoves = (board, position) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const posibilityMoves = [];
    const killMoves = [];

    const indexOfLetter = ALPHA_KEYS.indexOf(letter);

    const insideCalc = (i, key) => {
        if (board[key].piece) {
            killMoves.push(key);
        } else posibilityMoves.push(key);
    }

    for (let i = (indexOfLetter + 1); i <= ALPHA_KEYS.length; i++) {
        let key = `${ALPHA_KEYS[i]}${number}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter - 1); i >= 0; i--) {
        let key = `${ALPHA_KEYS[i]}${number}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (number - 1); i > 0; i--) {
        let key = `${letter}${i}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (number + 1); i <= 8; i++) {
        let key = `${letter}${i}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    colorMoves(board, posibilityMoves, killMoves);

    return board;
}

export const calcBispoMoves = (board, position) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const posibilityMoves = [];
    const killMoves = [];

    const indexOfLetter = ALPHA_KEYS.indexOf(letter);

    const insideCalc = (i, key) => {
        if (board[key].piece) {
            killMoves.push(key);
        } else posibilityMoves.push(key);
    }

    for (let i = (indexOfLetter + 1), j = 1; i <= ALPHA_KEYS.length; i++, j++) {
        let key = `${ALPHA_KEYS[i]}${number + j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter + 1), j = 1; i <= ALPHA_KEYS.length; i++, j++) {
        let key = `${ALPHA_KEYS[i]}${number - j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    for (let i = (indexOfLetter - 1), j = 1; i >= 0; i--, j++) {
        let key = `${ALPHA_KEYS[i]}${number - j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter - 1), j = 1; i >= 0; i--, j++) {
        let key = `${ALPHA_KEYS[i]}${number + j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    colorMoves(board, posibilityMoves, killMoves);

    return board;
}

export const calcHorseMoves = (board, position) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const posibilityMoves = [];
    const killMoves = [];

    const iLetter = ALPHA_KEYS.indexOf(letter);
    const h = (key) => ALPHA_KEYS[key];

    const insideCalc = (key) => {
        if (board[key].piece && !board[key].piece.playerSide) {
            killMoves.push(key);
        } else if (!board[key].piece) posibilityMoves.push(key);
    }

    if (board[`${h(iLetter + 2)}${number + 1}`]) insideCalc(`${h(iLetter + 2)}${number + 1}`);
    if (board[`${h(iLetter + 2)}${number - 1}`]) insideCalc(`${h(iLetter + 2)}${number - 1}`);
    if (board[`${h(iLetter - 2)}${number + 1}`]) insideCalc(`${h(iLetter - 2)}${number + 1}`);
    if (board[`${h(iLetter - 2)}${number - 1}`]) insideCalc(`${h(iLetter - 2)}${number - 1}`);
    if (board[`${h(iLetter + 1)}${number + 2}`]) insideCalc(`${h(iLetter + 1)}${number + 2}`);
    if (board[`${h(iLetter + 1)}${number - 2}`]) insideCalc(`${h(iLetter + 1)}${number - 2}`);
    if (board[`${h(iLetter - 1)}${number + 2}`]) insideCalc(`${h(iLetter - 1)}${number + 2}`);
    if (board[`${h(iLetter - 1)}${number - 2}`]) insideCalc(`${h(iLetter - 1)}${number - 2}`);
    colorMoves(board, posibilityMoves, killMoves);

    return board;
}

export const calcKingMoves = (board, position) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const posibilityMoves = [];
    const killMoves = [];

    const iLetter = ALPHA_KEYS.indexOf(letter);
    const h = (key) => ALPHA_KEYS[key];

    const insideCalc = (key) => {
        if (board[key].piece && !board[key].piece.playerSide) {
            killMoves.push(key);
        } else if (!board[key].piece) posibilityMoves.push(key);
    }

    if (board[`${h(iLetter + 1)}${number + 1}`]) insideCalc(`${h(iLetter + 1)}${number + 1}`);
    if (board[`${h(iLetter + 1)}${number - 1}`]) insideCalc(`${h(iLetter + 1)}${number - 1}`);
    if (board[`${h(iLetter - 1)}${number + 1}`]) insideCalc(`${h(iLetter - 1)}${number + 1}`);
    if (board[`${h(iLetter - 1)}${number - 1}`]) insideCalc(`${h(iLetter - 1)}${number - 1}`);
    if (board[`${h(iLetter + 1)}${number}`]) insideCalc(`${h(iLetter + 1)}${number}`);
    if (board[`${h(iLetter - 1)}${number}`]) insideCalc(`${h(iLetter - 1)}${number}`);
    if (board[`${h(iLetter)}${number + 1}`]) insideCalc(`${h(iLetter)}${number + 1}`);
    if (board[`${h(iLetter)}${number - 1}`]) insideCalc(`${h(iLetter)}${number - 1}`);

    colorMoves(board, posibilityMoves, killMoves);

    return board;
}

export const calcQueenMoves = (board, position) => {
    const number = parseInt(position.split("")[1]);
    const letter = position.split("")[0];
    const posibilityMoves = [];
    const killMoves = [];

    const indexOfLetter = ALPHA_KEYS.indexOf(letter);

    const insideCalc = (i, key) => {
        if (board[key].piece) {
            killMoves.push(key);
        } else posibilityMoves.push(key);
    }

    for (let i = (indexOfLetter + 1), j = 1; i <= ALPHA_KEYS.length; i++, j++) {
        let key = `${ALPHA_KEYS[i]}${number + j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter + 1), j = 1; i <= ALPHA_KEYS.length; i++, j++) {
        let key = `${ALPHA_KEYS[i]}${number - j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    for (let i = (indexOfLetter - 1), j = 1; i >= 0; i--, j++) {
        let key = `${ALPHA_KEYS[i]}${number - j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter - 1), j = 1; i >= 0; i--, j++) {
        let key = `${ALPHA_KEYS[i]}${number + j}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    for (let i = (indexOfLetter + 1); i <= ALPHA_KEYS.length; i++) {
        let key = `${ALPHA_KEYS[i]}${number}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (indexOfLetter - 1); i >= 0; i--) {
        let key = `${ALPHA_KEYS[i]}${number}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (number - 1); i > 0; i--) {
        let key = `${letter}${i}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }
    for (let i = (number + 1); i <= 8; i++) {
        let key = `${letter}${i}`;
        if (!board[key]) break;
        if (board[key].piece && board[key].piece.playerSide) break;
        insideCalc(i, key);
        if (board[key].piece) break;
    }

    colorMoves(board, posibilityMoves, killMoves);

    return board;
}