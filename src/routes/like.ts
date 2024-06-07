import { Router } from 'express'
import { addLike, getLikes } from '../controller/Like'
// import { updatePostLike } from '../controller/Post'
import { protection } from '../middleware/authorization'

const router = Router()

// router.post('/addLike/:id', protection, addLike, updatePostLike)
router.get('/getLikes', protection, getLikes)
export default router
