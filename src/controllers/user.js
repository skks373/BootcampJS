import userServices from "../services/user.js";

const getUsers = async (req, res) => {
    try {
        res.json(await userServices.getAll());
    } catch (err) {
        console.log(err)
        console.error(`Error while getting users`);
        res.status(500).send('Server error')
    }
};

const getUser = async (req, res) => {
    try {

        const existingUser = await userServices.getUser(req.params.id);

        if (!existingUser) {
            res.status(404).send("No user found");
            return;
        }

        res.json(existingUser);
    } catch (err) {
        console.error(`Error while getting user`);
        res.status(500).send('Server error')
    }
};

const addUser = async (req, res) => {
    try {
        const newUser = await userServices.addUser(req.body.name);
        res.json(newUser);
    } catch (err) {
        console.log(err)
        console.error(`Error while adding user`);
        res.status(500).send('Server error');
    }
};

const updateUser = async (req, res) => {
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
        console.log(err);
        console.error(`Error while updating user`);
        res.status(500).send('Server error');
    }
};

const deleteUser = async (req, res) => {
    try {
        await userServices.deleteUser(req.params.id);
        res.send("User deleted");
    } catch (err) {
        console.error(`Error while deleting user`);
        res.status(500).send('Server error');
    }
};

export default { getUsers, getUser, deleteUser, addUser, updateUser };
