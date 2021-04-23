import { RequestHandler } from "express";
import Posts from "../models/Posts";
import { post } from "../types/posts";

export const addPost: RequestHandler = async (req, res, next) => {
    try {
        const meme = <post>req.body.meme;
        const file = req.body.file;
        const post = await Posts.create({
            meme: meme,
            photo: file,
        });
        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        next(error);
    }
};
