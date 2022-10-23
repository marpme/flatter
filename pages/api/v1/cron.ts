import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiHandler } from 'next'
import { getDegewoProperties } from '../../../lib/immo/degewo'
import { getHowogeProperties } from '../../../lib/immo/howoge'
import { Database } from '../../../types/supabase'
import { log } from 'next-axiom'

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

                await Promise.allSettled([
                    getDegewoProperties(),
                    getHowogeProperties(),
                ]).then(async (results) => {
                    await client.from('properties').delete()
                    await Promise.all(
                        results.map(async (result) => {
                            if (result.status === 'fulfilled') {
                                return Promise.all(
                                    result.value.map(
                                        async ({
                                            id,
                                            sqmeterPriceRatio,
                                            ...rest
                                        }) => {
                                            const { error, data } = await client
                                                .from('properties')
                                                .insert(rest)

                                            log.debug(
                                                `Added ${id} to the properties list`
                                            )

                                            return Promise.resolve({
                                                error,
                                                data,
                                            })
                                        }
                                    )
                                )
                            }

                            return Promise.resolve()
                        })
                    )
                })

                res.status(200).json({ success: true })
            } else {
                res.status(401).json({ success: false })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST')
            .status(405)
            .json({ message: 'Method not allowed' })
    }
}

export default CronPropertiesHandler
