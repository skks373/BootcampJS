import userServices from "../services/userServices.js";

const getUsers = async (req, res, next) => {
  try {
    res.json(await userServices.getAll());
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await userServices.getUser(parseInt(req.params.id));

    if (!response) {
      throw { message: "No user found" };
    }

    res.json(response);
  } catch (err) {
    console.error(`Error while getting user`);
    next(err);
  }
};

const fakeGetUser = async (req, res, next) => {
  try {
    res.json({ message: "I am not what you expect" });
  } catch (err) {
    console.error(`Error while getting user`);
    next(err);
  }
};

const fakeGetUser2 = async (req, res, next) => {
  try {
    res.json({ message: "second" });
  } catch (err) {
    console.error(`Error while getting user`);
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    if (!req?.body?.name) {
      throw { message: "No name provided" };
    }

    const response = await userServices.addUser({
      name: req.body.name,
      location: req?.body?.location || "",
      position: req?.body?.position || "",
      age: parseInt(req?.body?.age) || "",
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while adding user`);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const id = parseInt(req.params.id);
    const user = await userServices.getUser(id);

    if (!user) {
      throw { message: "User not found" };
    }

    const response = await userServices.updateUser(id, {
      name: req?.body?.name || user.name,
      location: req?.body?.location || user.location,
      position: req?.body?.position || user.position,
      age: parseInt(req?.body?.age) || user.age,
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while updating user`);
    next(err);
  }
};

const updateUser2 = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userServices.getUser(id);

    const response = await userServices.updateUser(id, {
      name: req?.body?.name,
      location: req?.body?.location,
      position: req?.body?.position,
      age: parseInt(req?.body?.age),
    });

    res.json({ message: "Update2" });
  } catch (err) {
    console.log('Error for second update')
    next(err)
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await userServices.deleteUser(parseInt(req.params.id));
    res.json({ message: response });
  } catch (err) {
    console.error(`Error while deleting user`);
    next(err);
  }
};

export default { getUsers, getUser, deleteUser, addUser, updateUser, updateUser2, fakeGetUser, fakeGetUser2 };
