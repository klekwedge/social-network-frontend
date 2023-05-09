import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
        city: String,
        age: Number,
        university: String,
        friends: Array(String)
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);