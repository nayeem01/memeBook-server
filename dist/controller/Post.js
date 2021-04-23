"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPost = void 0;
const Posts_1 = __importDefault(require("../models/Posts"));
const addPost = async (req, res, next) => {
    try {
        const meme = req.body.meme;
        const file = req.body.file;
        const post = await Posts_1.default.create({
            meme: meme,
            photo: file,
        });
        res.status(200).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addPost = addPost;
