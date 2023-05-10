import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndDelete({
            _id: postId,
        });

        // (err, doc) => {
        //   if (err) {
        //     console.log(err);
        //     return res.status(500).json({
        //       message: "Не удалось удалить статью",
        //     });
        //   }

        //   if (!doc) {
        //     return res.status(404).json({
        //       message: "Статья не найдена",
        //     });
        //   }

        //   res.json({
        //     success: true,
        //   });
        // };

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: "after",
            }
        ).populate("user").exec()

        res.json(doc);

        // (err, doc) => {
        //   console.log("!!!");
        //   if (err) {
        //     console.log(err);

        //     return res.status(500).json({
        //       message: "Не удалось вернуть статью",
        //     });
        //   }

        //   if (!doc) {
        //     return res.status(404).json({
        //       message: "Статья не найдена",
        //     });
        //   }

        //   res.json(doc);
        // };
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось создать статью",
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            }
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось обновить статью",
        });
    }
};

export const getUserPosts = async (req, res) => {
    const userId = req.params.id

    try {
        const posts = await PostModel.find({ user: userId }).populate("user").exec();
        res.json(posts);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};