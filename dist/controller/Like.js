"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikes = exports.addLike = void 0;
const Likes_1 = __importDefault(require("../models/Likes"));
const addLike = async (req, res, next) => {
    try {
        const like = await Likes_1.default.create({
            userID: req.user._id,
            count: req.body.count,
        });
        req.likeOb = like;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.addLike = addLike;
const getLikes = async (req, res, next) => {
    try {
        const likes = await Likes_1.default.find();
        res.status(200).json({
            success: true,
            data: likes,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getLikes = getLikes;
