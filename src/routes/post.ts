import { Router } from 'express'
import {
  addPost,
  getPost,
  updatePostInfo,
  deletePost,
} from '../controller/Post'
import multer from 'multer'
import { protection } from '../middleware/authorization'
// import { isOwnerOFPost } from '../middleware/isOwner'
// import { cache } from '../middleware/cache'
const router = Router()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const upload = multer({ storage: fileStorage })

router.get('/getPost', getPost)
router.post('/post', upload.single('photo'), addPost)
// router.put('/updatePost/:id', protection, isOwnerOFPost, updatePostInfo)
// router.delete('/deletePost/:id', protection, isOwnerOFPost, deletePost)
export default router
