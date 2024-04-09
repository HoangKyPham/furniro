import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    email :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
    },
    name :{
        type: String,
        required: true,
        minLength: 3,
        maxLength:30,
    },
    role :{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar :{
        type: String,
        default: "avatar"
    },
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("User", userSchema);