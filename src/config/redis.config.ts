import redis from 'redis'
import endpoint from './endpoints.config'

const REDIS_PORT: any = endpoint.REDIS_PORT || 6379

export const client = redis.createClient(REDIS_PORT)
