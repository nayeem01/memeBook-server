"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
CommentSchema.methods.matchID = async function (enteredUserID) {
    return (await enteredUserID) == this.userID;
};
exports.default = mongoose_1.model('Comment', CommentSchema);
