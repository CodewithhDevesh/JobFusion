import express from "express";
import { logout,login, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/logout").get(logout);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
