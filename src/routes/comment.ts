import { Router } from 'express'
import { protection } from '../middleware/authorization'
import { isOwnerOfComment } from '../middleware/isOwner'
import {
  addComment,
  getComments,
  updateCommentInfo,
} from '../controller/Comment'
import { updatePostComment } from '../controller/Post'

const router = Router()

router.post('/addComment/:id', protection, addComment, updatePostComment)
router.put(
  '/updateComment/:id',
  protection,
  isOwnerOfComment,
  updateCommentInfo
)
router.get('/getComments', protection, getComments)
export default router
