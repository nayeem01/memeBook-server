"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LikeSchema = new mongoose_1.Schema({
    userID: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Like', LikeSchema);
