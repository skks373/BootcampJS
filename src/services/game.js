import { PrismaClient } from "@prisma/client";
import { computeBoardPosition, computeSymbol, verifyGame } from "../utils/game.js";

const prisma = new PrismaClient();

const getAll = async () => {
    const games = await prisma.game.findMany()
    return games;
};

const getGame = async (id) => {
    const game = await prisma.game.findUnique({
        where: {
            id
        }
    })
    return game;
};

const createGame = async (ownerId) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: ownerId
        }
    });
    if (!existingUser) {
        throw Error("User does not exist");
    }

    // Generate new game with random symbol for the owner
    const game = await prisma.game.create({
        data: {
            uid: existingUser.id,
            ownerSymbol: Math.round(Math.random()) === 0 ? false : true
        }
    });
    return game;
};

const updateGame = async (id, playerId, xPos, yPos) => {
    const existingGame = await prisma.game.findUnique({
        where: {
            id
        }
    });

    if (!existingGame || !existingGame.opponentId) {
        throw new Error("Invalid game - does not exist or no opponent");
    }

    if (existingGame.status === "FINISHED") {
        throw new Error("The game is already finished");
    }

    const boardPosition = computeBoardPosition(xPos, yPos);
    if (parseInt(existingGame.board[boardPosition]) !== -1 || boardPosition < 0 || boardPosition > 8) {
        throw new Error("Invalid position");
    }

    if (existingGame.uid !== playerId && existingGame.opponentId !== playerId) {
        throw new Error("Invalid player id");
    }

    const playerSymbol = computeSymbol(playerId, existingGame.uid, existingGame.ownerSymbol);

    const board = [...existingGame.board];
    board[boardPosition] = playerSymbol
    const isGameFinished = verifyGame(board, existingGame.ownerSymbol, existingGame.uid, existingGame.opponentId);
    const updatedGame = await prisma.game.update({
        where: {
            id
        },
        data: {
            board,
            status: isGameFinished.finished ? "FINISHED" : "ACTIVE",
            winnerId: isGameFinished.finished && isGameFinished.winner !== "tie" ? isGameFinished.winner : null
        }
    })

    return updatedGame
};

const addOpponent = async (id, opponentId) => {
    const existingGame = await prisma.game.findUnique({
        where: {
            id
        }
    });

    if (!existingGame) {
        throw new Error("Invalid game id");
    }

    if (existingGame.status === "FINISHED" || existingGame.opponentId) {
        throw new Error("Invalid game");
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            id: opponentId
        }
    });

    if (!existingUser || existingUser.id === existingGame.uid) {
        throw new Error("Invalid user");
    }

    const updatedGame = await prisma.game.update({
        where: {
            id
        },
        data: {
            opponentId: existingUser.id
        }
    });

    return updatedGame;
};

const deleteGame = async (id) => {
    const game = await prisma.game.delete({
        where: {
            id
        }
    });
    return game;
};

export default { getAll, getGame, createGame, deleteGame, updateGame, addOpponent };
