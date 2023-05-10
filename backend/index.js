import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {
    registerValidation,
    loginValidation,
    postCreateValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Ok");
    })
    .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.post(
    "/auth/login",

    loginValidation,
    handleValidationErrors,
    UserController.login
);
app.post(
    "/auth/register",

    registerValidation,
    handleValidationErrors,
    UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/user/:id", UserController.getUser);
app.patch("/user/:id", checkAuth, UserController.changeUserInfo);

app.post("/friend", checkAuth, UserController.addFriend);
app.patch("/friend", checkAuth, UserController.deleteFriend);
app.get("/friend/:id", checkAuth, UserController.getPostFriends);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
    "/posts",
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
    "/posts/:id",
    checkAuth,
    handleValidationErrors,
    PostController.update
);

app.get("/user/posts/:id", PostController.getUserPosts);

app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Server Ok");
});