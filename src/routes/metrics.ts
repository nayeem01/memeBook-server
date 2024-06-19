import { Router } from 'express'
import { getMetrics } from '../controller/Metrics'

const router = Router()

router.get('/metrics', getMetrics)
export default router
