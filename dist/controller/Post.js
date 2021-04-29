"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePostInfo = exports.updatePostComment = exports.updatePostLike = exports.getPost = exports.addPost = void 0;
const Posts_1 = __importDefault(require("../models/Posts"));
const redis_config_1 = require("../config/redis.config");
const addPost = async (req, res, next) => {
    try {
        const post = await Posts_1.default.create({
            userID: req.user._id,
            meme: req.body.meme,
            photo: req.file.path,
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
const getPost = async (req, res, next) => {
    const haskey = 'post';
    try {
        const posts = await Posts_1.default.find()
            .populate('likes', 'count')
            .populate('comments', 'comment');
        if (posts.length === 0) {
            res.status(400).json({
                success: false,
                message: 'no data found',
            });
        }
        console.log(posts);
        redis_config_1.client.setex(haskey, 3600, JSON.stringify(posts));
        res.status(200).json({
            success: true,
            data: posts,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getPost = getPost;
const updatePostLike = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Posts_1.default.findByIdAndUpdate(id, {
            $push: { likes: req.likeOb },
        }, { new: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePostLike = updatePostLike;
const updatePostComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Posts_1.default.findByIdAndUpdate(id, {
            $push: { comments: req.commentOb },
        }, { new: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePostComment = updatePostComment;
const updatePostInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Posts_1.default.findByIdAndUpdate(id, {
            meme: req.body.meme,
        }, { new: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            data: post,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePostInfo = updatePostInfo;
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Posts_1.default.findByIdAndDelete(id);
        if (post) {
            res.status(200).json({
                success: true,
                data: {},
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'can not find post',
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deletePost = deletePost;
