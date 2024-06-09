import { Router } from 'express'
import path from 'path'
import fs from 'fs'

import {
  addPost,
  getPost,
  updatePostInfo,
  deletePost,
  updatePostPhoto,
} from '../controller/Post'
import multer, { DiskStorageOptions } from 'multer'
import { protection } from '../middleware/authorization'
import { isOwnerOFPost } from '../middleware/isOwner'
import { cache } from '../middleware/redis.cache'
const router = Router()

const uploadDir = path.join(__dirname, '../../uploads/')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}
const fileStorage: DiskStorageOptions = {
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname.replace(
      /[^a-zA-Z0-9.]/g,
      '_'
    )}`
    cb(null, uniqueSuffix)
  },
}

const upload = multer({ storage: multer.diskStorage(fileStorage) })

router.get('/getPost', protection, cache, getPost)
router.post('/post', upload.single('photo'), protection, addPost)
router.put('/updatePostInfo/:id', updatePostInfo)
router.put(
  '/updatePostPhoto/:id',
  upload.single('photo'),
  protection,
  isOwnerOFPost,
  updatePostPhoto
)
router.delete('/deletePost/:id', protection, isOwnerOFPost, deletePost)
export default router
