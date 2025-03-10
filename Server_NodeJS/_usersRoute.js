import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./_usersControllers.js";

export const router = new Router()

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser)