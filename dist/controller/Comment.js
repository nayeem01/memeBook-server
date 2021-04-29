"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = void 0;
const Comments_1 = __importDefault(require("../models/Comments"));
const addComment = async (req, res, next) => {
    try {
        const comment = await Comments_1.default.create({
            userID: req.user._id,
            comment: req.body.comment,
        });
        req.commentOb = comment;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.addComment = addComment;
const getComments = async (req, res, next) => {
    try {
        const comment = await Comments_1.default.find();
        if (comment.length === 0) {
            res.status(400).json({
                success: false,
                message: 'no data found',
            });
        }
        res.status(200).json({
            success: true,
            data: comment,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getComments = getComments;
