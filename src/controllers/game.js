import gamesService from "../services/game.js";

const getGames = async (req, res) => {
    try {
        res.json(await gamesService.getAll());
    } catch (err) {
        next(err);
    }
};

const getGame = async (req, res) => {
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

const updateGame = async (req, res) => {
    try {
        const updatedGame = await gamesService.updateGame(id, req.body.playerId, xPos, yPos);
        res.send(updatedGame);
    } catch (err) {
        next(err);
    }
};

const addOpponnent = async (req, res) => {
    try {
        const updatedGame = await gamesService.addOpponnent(id, req.body.opponnentId);
        res.send(updatedGame);
    } catch (err) {
        next(err);
    }
};

const deleteGame = async (req, res) => {
    try {
        await gamesService.deleteGame(req.params.id);
        res.send("Game deleted");
    } catch (err) {
        next(err);
    }
};

export default { getGames, getGame, createGame, updateGame, deleteGame, addOpponnent };
