import { Router } from 'express'
import { protection } from '../middleware/authorization'
import { isOwnerOfComment } from '../middleware/isOwner'
import {
  addComment,
  getComments,
  updateCommentInfo,
  deleteComment,
} from '../controller/Comment'
// import { updatePostComment } from '../controller/Post'

const router = Router()

router.post('/addComment/:id', protection, addComment)
// router.get('/getComments', protection, getComments)
router.put(
  '/updateComment/:id',
  protection,
  isOwnerOfComment,
  updateCommentInfo
)
router.delete('/deleteComment/:id', protection, isOwnerOfComment, deleteComment)
export default router
