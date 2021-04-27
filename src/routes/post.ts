import { Router } from 'express'
import { addPost, getPost } from '../controller/Post'
import multer from 'multer'
import { protection } from '../middleware/authorization'
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
export default router
