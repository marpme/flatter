import { NextApiHandler } from 'next'
import { getDegewoProperties } from '../../../lib/immo/degewo'
import { getHowogeProperties } from '../../../lib/immo/howoge'

import {
  deleteRemovedEntries,
  upsertNewProperties,
} from '../../../lib/immo/cron'
import { getGesobauProperties } from '../../../lib/immo/gesobau'
import { setUpdateTimestamp } from '../../../lib/RedisClient'

type CronResult =
  | {
      success: true
      length: number
      removedLength: number
    }
  | { success: false; message: string }

const CronPropertiesHandler: NextApiHandler<CronResult> = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const listOfProperties = await Promise.all([
          getDegewoProperties(),
          // getHowogeProperties(),
          getGesobauProperties(),
        ])

        await upsertNewProperties(listOfProperties)
        const removedProperties = await deleteRemovedEntries(listOfProperties)

        await setUpdateTimestamp()

        res.status(200).json({
          success: true,
          length: listOfProperties.reduce(
            (sum, properties) => sum + properties.length,
            0
          ),
          removedLength: removedProperties.length,
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'access denied',
        })
      }
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message })
    }
  } else {
    res
      .setHeader('Allow', 'POST')
      .status(405)
      .json({ success: false, message: 'Method not allowed' })
  }
}

export default CronPropertiesHandler
