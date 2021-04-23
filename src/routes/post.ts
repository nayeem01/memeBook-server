import { Router } from "express";
import { addPost } from "../controller/Post";

const router = Router();

router.post("/post", addPost);

export default router;
