import userServices from "../services/user.js";

const getUsers = async (req, res, next) => {
    try {
        res.json(await userServices.getAll());
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {

        const existingUser = await userServices.getUser(req.params.id);

        if (!existingUser) {
            res.status(404).send("No user found");
            return;
        }

        res.json(existingUser);
    } catch (err) {
        next(err);
    }
};

const addUser = async (req, res, next) => {
    try {
        const newUser = await userServices.addUser(req.body.name);
        res.json(newUser);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await userServices.getUser(id);

        if (!user) {
            res.status(404).send("No user found");
            return;
        }

        await userServices.updateUser(id, req.body.name);
        res.send("User updated");
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userServices.deleteUser(req.params.id);
        res.send("User deleted");
    } catch (err) {
        next(err);
    }
};

export default { getUsers, getUser, deleteUser, addUser, updateUser };
