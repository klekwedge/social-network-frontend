import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";
import PostModel from "../models/Post.js";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        // console.log(user)

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Нет доступа",
        });
    }
};


export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Нет доступа",
        });
    }
};

export const changeUserPhoto = async (req, res) => {
    try {
        const userId = req.params.id;

        const doc = await UserModel.updateOne(
            {
                _id: userId,
            },
            {
                avatarUrl: req.body.imageUrl,
            }
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось обновить фотографию пользователя",
        });
    }
};

export const getPostFriends = async (req, res) => {
    console.log(req.params);
    try {
        const user = await UserModel.find(
            {
                _id: req.params.id,
            },
        )
        
        // const friends = user.friends

        // console.log('f', friends);

        const userPosts = await PostModel.find(
            {
                user: req.params.id,
            },
        )

        // console.log(userPosts);

        // const posts = await UserModel.find({
        //     _id: {
        //         $or: {

        //         }
        //     }
        // })
        // res.json(posts);
        res.json({})
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось получить статьи друзей",
        });
    }

};

export const addFriend = async (req, res) => {
    try {
        const userId = req.body.user;
        const friend = req.body.friend;

        const doc = await UserModel.updateOne(
            {
                _id: userId,
            },
            {
                $push: {
                    "friends": friend
                }
            }
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось добавить друга",
        });
    }
};

export const deleteFriend = async (req, res) => {
    try {
        const userId = req.body.user;
        const friend = req.body.friend;

        // db.online_service.update(
        //     { },
        //     { $pull: { accounts_data: { $elemMatch: { id: "inst_f18+" } } } }, 
        //     { multi: true }
        // )

        const doc = await UserModel.findByIdAndUpdate({
            _id: userId,
        },
            {
                $pull: { friends: friend }
            }
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось удалить друга",
        });
    }
};