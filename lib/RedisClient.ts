import { Redis } from '@upstash/redis'

const client = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

enum REDIS_KEY {
  UPDATE_TIMESTAMP = 'update_timestamp',
}

export const setUpdateTimestamp = () =>
  client.set(REDIS_KEY.UPDATE_TIMESTAMP, Date.now())

export const getUpdateTimestamp = () => client.get(REDIS_KEY.UPDATE_TIMESTAMP)
