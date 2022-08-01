import express from "express";
import gamesController from "../controllers/game.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.route('/')
    .get(requestMiddleware, gamesController.getGames)
    .post([
        check("uid", "No user id").exists()
    ], validationMiddleware, gamesController.createGame)

router.route('/:id')
    .get(requestMiddleware, gamesController.getGame)
    .put([
        check("playerId", "No player provided").exists(),
        check("xPos", "Invalid move").exists().isInt({ min: 0, max: 2 }),
        check("yPos", "Invalid move").exists().isInt({ min: 0, max: 2 })
    ], validationMiddleware, gamesController.updateGame)
    .delete(gamesController.deleteGame)

router.put('/:id/opponent', [
    check("opponentId", "No opponent provided").exists()
], validationMiddleware, gamesController.addOpponent)

export default router;
