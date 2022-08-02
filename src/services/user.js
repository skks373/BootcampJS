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
        },
        include: {
            personalGames: true,
            inviteGames: true
        }
    })
    return user;
};

const addUser = async (name) => {
    const user = await prisma.user.create({
        data: {
            name
        }
    });
    return user;
};

const updateUser = async (id, name) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            name
        }
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
