import express from "express";
import bodyParser from "body-parser";
import usersController from "../controllers/userController.js";
import requestMiddleware from "../middleware/requestMiddleware.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get("/", requestMiddleware, usersController.getUsers);
router.get("/:id(\\d+)", requestMiddleware, usersController.getUser);
router.get("/test", usersController.fakeGetUser2);
router.get("/:id(\\w+)", usersController.fakeGetUser);

router.post("/", urlencodedParser, usersController.addUser);
router.patch("/:id(\\d+)", urlencodedParser, usersController.updateUser);
router.put("/:id(\\d+)", urlencodedParser, usersController.updateUser2);

router.delete("/:id(\\d+)", usersController.deleteUser);

export default router;
