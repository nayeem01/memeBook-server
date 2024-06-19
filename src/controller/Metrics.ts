import { RequestHandler } from 'express'

import { collectDefaultMetrics, Registry } from 'prom-client'

const register = new Registry()
collectDefaultMetrics({ register })

export const getMetrics: RequestHandler = async (req, res, next) => {
  res.setHeader('Content-Type', register.contentType)
  const metrics = await register.metrics()
  res.send(metrics)
}
