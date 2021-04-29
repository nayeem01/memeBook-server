"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = void 0;
const Posts_1 = __importDefault(require("../models/Posts"));
const isOwner = async (req, res, next) => {
    const post = await Posts_1.default.findById(req.params.id);
    if (post !== null && post.matchID(req.user._id)) {
        next();
    }
    else {
        res.status(401).json({
            success: true,
            message: 'you are not the owner of this post',
        });
    }
};
exports.isOwner = isOwner;
