import { Router } from 'express'
import {
  addPost,
  getPost,
  updatePostInfo,
  deletePost,
} from '../controller/Post'
import multer from 'multer'
import { protection } from '../middleware/authorization'
import { isOwner } from '../middleware/isOwner'
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

router.post('/post', protection, upload.single('photo'), addPost)
router.get('/getPost', protection, getPost)
router.put('/updatePost/:id', protection, isOwner, updatePostInfo)
router.delete('/deletePost/:id', protection, isOwner, deletePost)
export default router
