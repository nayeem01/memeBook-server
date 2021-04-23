"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    meme: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("Post", PostSchema);
