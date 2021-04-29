"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        required: true,
    },
    meme: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Like',
        },
    ],
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
}, { timestamps: true });
PostSchema.methods.matchID = async function (enteredUserID) {
    return (await enteredUserID) == this.userID;
};
exports.default = mongoose_1.model('Post', PostSchema);
