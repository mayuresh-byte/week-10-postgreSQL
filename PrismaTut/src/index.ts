import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string;
    lastName: string;
}

// When we are providing errornous data and trying to insert it into the DB then its failing but Id is incrementing. We can handle this by
// Handling erros properly. Following code is just for learning purpose. There is always room for optimising this logic.
async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    try {
        const res = await prisma.user.create({
            data: {
                email: username,
                password,
                firstname: firstName,
                lastname: lastName
            }
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(username: string, { firstName, lastName }: UpdateParams) {
    const res = await prisma.user.update({
        data: {
            email: username,
            firstname: firstName,
            lastname: lastName
        },
        where: {email: username}
    });
    console.log(res);
}

async function getUsers() {
    const res = await prisma.user.findMany();
    console.log(res);
}

async function deleteUser(username: string) {
    const res = await prisma.user.delete({
        where: {email: username}
    });
    console.log(res);
}

insertUser("AAI2", "123456", "harkirat", "singh");
// updateUser("admin1", {firstName: "Admin11", lastName: "singh" });
// getUsers();
// deleteUser('Mayuresh1');
