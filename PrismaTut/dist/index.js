"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.create({
                data: {
                    email: username,
                    password,
                    firstname: firstName,
                    lastname: lastName
                }
            });
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            data: {
                email: username,
                firstname: firstName,
                lastname: lastName
            },
            where: { email: username }
        });
        console.log(res);
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany();
        console.log(res);
    });
}
function deleteUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.delete({
            where: { email: username }
        });
        console.log(res);
    });
}
insertUser("AAI2", "123456", "harkirat", "singh");
// updateUser("admin1", {firstName: "Admin11", lastName: "singh" });
getUsers();
// deleteUser('Mayuresh1');
