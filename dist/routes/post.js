"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../controller/Post");
const multer_1 = __importDefault(require("multer"));
const authorization_1 = require("../middleware/authorization");
const isOwner_1 = require("../middleware/isOwner");
const cache_1 = require("../middleware/cache");
const router = express_1.Router();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const upload = multer_1.default({ storage: fileStorage });
router.post('/post', authorization_1.protection, upload.single('photo'), Post_1.addPost);
router.get('/getPost', authorization_1.protection, cache_1.cache, Post_1.getPost);
router.put('/updatePost/:id', authorization_1.protection, isOwner_1.isOwner, Post_1.updatePostInfo);
router.delete('/deletePost/:id', authorization_1.protection, isOwner_1.isOwner, Post_1.deletePost);
exports.default = router;
