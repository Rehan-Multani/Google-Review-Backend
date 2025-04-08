import express from "express";

import UserController from "../Controllers/AuthCtrl.js";
import { authMiddleware } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/users",authMiddleware, UserController.getallUser);
router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
router.put("/edituser/:id", UserController.editUser);
router.delete("/deleteuser/:id", UserController.deleteUser);

export default router;
