import express from "express";
import usersController from "../controllers/userController.js";
import requestMiddleware from "../middleware/requestMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/", requestMiddleware, usersController.getUsers);
router.get("/:id(\\d+)", requestMiddleware, usersController.getUser);
router.get("/test", usersController.fakeGetUser2);
router.get("/:id(\\w+)", usersController.fakeGetUser);

router.post("/", [
    check("name", "Invalid name, it must have at least 4 characters").isLength({ min: 4 }),
    check("age", "Invalid age, must be over 18").isInt({ min: 18 }),
    check("location").exists()
], validationMiddleware, usersController.addUser);

router.patch("/:id(\\d+)", usersController.updateUser);

router.put("/:id(\\d+)", usersController.updateUser2);

router.delete("/:id(\\d+)", usersController.deleteUser);

export default router;
