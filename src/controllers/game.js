import gamesService from "../services/game.js";

const getGames = async (req, res) => {
    try {
        res.json(await gamesService.getAll());
    } catch (err) {
        console.log(err)
        console.error(`Error while getting games`);
        res.status(500).send('Server error')
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
        console.error(`Error while getting game`);
        res.status(500).send('Server error')
    }
};

const createGame = async (req, res) => {
    try {
        const newGame = await gamesService.createGame(req.body.uid);
        res.json(newGame);
    } catch (err) {
        console.log(err)
        console.error(`Error while creating game`);
        res.status(500).send('Server error');
    }
};

const updateGame = async (req, res) => {
    try {
        const updatedGame = await gamesService.updateGame(id, req.body.playerId, xPos, yPos);
        res.send(updatedGame);
    } catch (err) {
        console.log(err);
        console.error(`Error while updating game`);
        res.status(500).send('Server error');
    }
};

const addOpponnent = async (req, res) => {
    try {
        const updatedGame = await gamesService.addOpponnent(id, req.body.opponnentId);
        res.send(updatedGame);
    } catch (err) {
        console.log(err);
        console.error(`Error while updating game`);
        res.status(500).send('Server error');
    }
};

const deleteGame = async (req, res) => {
    try {
        await gamesService.deleteGame(req.params.id);
        res.send("Game deleted");
    } catch (err) {
        console.error(`Error while deleting game`);
        res.status(500).send('Server error');
    }
};

export default { getGames, getGame, createGame, updateGame, deleteGame, addOpponnent };
