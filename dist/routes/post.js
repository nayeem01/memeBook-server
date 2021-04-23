"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../controller/Post");
const router = express_1.Router();
router.post("/post", Post_1.addPost);
exports.default = router;
