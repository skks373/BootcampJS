import gamesService from "../services/game.js";

const getGames = async (req, res, next) => {
    try {
        res.json(await gamesService.getAll());
    } catch (err) {
        next(err);
    }
};

const getGame = async (req, res, next) => {
    try {

        const existingGame = await gamesService.getGame(req.params.id);

        if (!existingGame) {
            res.status(404).send("No game found");
            return;
        }

        res.json(existingGame);
    } catch (err) {
        next(err);
    }
};

const createGame = async (req, res, next) => {
    try {
        const newGame = await gamesService.createGame(req.body.uid);
        res.json(newGame);
    } catch (err) {
        next(err);
    }
};

const updateGame = async (req, res, next) => {
    try {
        const updatedGame = await gamesService.updateGame(req.params.id, req.body.playerId, parseInt(req.body.xPos), parseInt(req.body.yPos));
        res.send(updatedGame);
    } catch (err) {
        next(err);
    }
};

const addOpponent = async (req, res, next) => {
    try {
        const updatedGame = await gamesService.addOpponent(req.params.id, req.body.opponentId);
        res.send(updatedGame);
    } catch (err) {
        next(err);
    }
};

const deleteGame = async (req, res, next) => {
    try {
        await gamesService.deleteGame(req.params.id);
        res.send("Game deleted");
    } catch (err) {
        next(err);
    }
};

export default { getGames, getGame, createGame, updateGame, deleteGame, addOpponent };
