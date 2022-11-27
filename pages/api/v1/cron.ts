import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiHandler } from 'next'
import { getDegewoProperties } from '../../../lib/immo/degewo'
import { getHowogeProperties } from '../../../lib/immo/howoge'
import { Database } from '../../../types/supabase'
import {
    deletePreviousEntries,
    insertNewProperties,
} from '../../../lib/immo/cron'
import { getGesobauProperties } from '../../../lib/immo/gesobau'

type CronResult =
    | {
          message: string
      }
    | { success: boolean }

const CronPropertiesHandler: NextApiHandler<CronResult> = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers

            if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
                const client = createServerSupabaseClient<Database>({
                    req,
                    res,
                })

                await Promise.all([
                    getDegewoProperties(),
                    getHowogeProperties(),
                    getGesobauProperties(),
                ]).then(async (results) => {
                    await deletePreviousEntries(client)
                    await insertNewProperties(results, client)
                })

                res.status(200).json({ success: true })
            } else {
                res.status(401).json({ success: false })
            }
        } catch (err: any) {
            res.status(500).json({ message: err?.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
            .status(405)
            .json({ message: 'Method not allowed' })
    }
}

export default CronPropertiesHandler
