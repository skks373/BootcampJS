import datastore from "../datastore.js";
import connection from "../db/index.js";

const getAll = async () => {
  const users = await connection.query('SELECT * FROM users');
  return users[0];
};

const getUser = async (id) => {
  const user = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
  return user[0][0];
};

const addUser = async (userInfo) => {
  await connection.query(`INSERT INTO users SET ?`, [userInfo])
  return "User added"
};

const updateUser = async (id, userInfo) => {
  const existingUser = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
  if (existingUser) {
    await connection.query(`UPDATE users set ? WHERE id = ${id}`, [userInfo]);
    return "User updated";
  }
  return "User not found";
};

const deleteUser = async (id) => {
  const userDeleted = await connection.query(`DELETE FROM USERS WHERE id = ${id}`);
  return userDeleted;
};

export default { getAll, getUser, deleteUser, addUser, updateUser };
