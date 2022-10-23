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

const deletePreviousEntries = async (client) => {
    const currentProperties = await client.from('properties').select('*')
    await Promise.all(
        currentProperties.data.map(async (property) =>
            client.from('properties').delete().eq('id', property.id)
        )
    )
}

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
                    await deletePreviousEntries(client)
                    await insertNewProperties(results, client)
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
async function insertNewProperties(results: [PromiseSettledResult<import("/home/marpme/work/berlin-flat-search/lib/Property").default[]>, PromiseSettledResult<import("/home/marpme/work/berlin-flat-search/lib/Property").default[]>], client) {
    await Promise.all(
        results.map(async (result) => {
            if (result.status === 'fulfilled') {
                return Promise.all(
                    result.value.map(
                        async ({
                            id, sqmeterPriceRatio, ...rest
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
}

