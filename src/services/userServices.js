import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
  const users = await prisma.user.findMany()
  return users;
};

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return user;
};

const addUser = async (userInfo) => {
  const user = await prisma.user.create({
    data: { ...userInfo }
  });
  return user;
};

const updateUser = async (id, userInfo) => {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: { ...userInfo }
  })
  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: id
    }
  });
  return user;
};

export default { getAll, getUser, deleteUser, addUser, updateUser };
