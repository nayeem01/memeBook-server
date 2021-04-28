import { Router } from 'express'
import { protection } from '../middleware/authorization'
import { addComment, getComments } from '../controller/Comment'
import { updatePostComment } from '../controller/Post'

const router = Router()

router.post('/addComment/:id', protection, addComment, updatePostComment)
router.get('/getComments', protection, getComments)
export default router
