import { Router } from 'express'
import { addLike, getLikes } from '../controller/Like'
import { updatePost } from '../controller/Post'

const router = Router()

router.post('/addLike/:id', addLike, updatePost)
router.get('/getLikes', getLikes)
export default router
