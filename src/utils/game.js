export const computeBoardPosition = (xPos, yPos) => {
    return (3 * yPos + xPos);
}

export const computeSymbol = (playerId, ownerId, ownerSymbol) => {
    if (playerId === ownerId) {
        return ownerSymbol ? 1 : 0;
    }
    return ownerSymbol ? 0 : 1;
}

export const verifyGame = (board, ownerSymbol, ownerId, opponentId) => {
    const ownerValue = ownerSymbol ? 1 : 0;
    // Check horizontal
    if ((board[0] == board[1] == board[2]) && board[0] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[0] ? ownerId : opponentId
        }
    }
    if ((board[3] == board[4] == board[5]) && board[3] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[3] ? ownerId : opponentId
        }
    }
    if ((board[6] == board[7] == board[8]) && board[6] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[6] ? ownerId : opponentId
        }
    }

    // Check vertical
    if ((board[0] == board[3] == board[6]) && board[0] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[0] ? ownerId : opponentId
        }
    }
    if ((board[1] == board[4] == board[7]) && board[1] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[1] ? ownerId : opponentId
        }
    }
    if ((board[2] === board[5] == board[8]) && board[2] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[2] ? ownerId : opponentId
        }
    }

    // Check diagonal
    if ((board[0] == board[4] == board[8]) && board[0] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[0] ? ownerId : opponentId
        }
    }
    if ((board[2] == board[4] == board[6]) && board[2] != -1) {
        return {
            finished: true,
            winner: ownerValue == board[2] ? ownerId : opponentId
        }
    }

    const emptyCharacter = board.find(elem => elem == -1);
    if (emptyCharacter) {
        return {
            finished: false,
            winner: null
        }
    }

    return {
        finished: true,
        winner: "tie"
    }
}