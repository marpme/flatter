import { NextApiRequest, NextApiResponse } from 'next'
import { providerToPropertyMap } from '../../../../lib/immo/available'
import { Organisation } from '../../../../lib/Organisation'

const providerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { provider } = req.query as { provider: Organisation }
    if (typeof provider !== 'string') {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    if (!providerToPropertyMap.has(provider)) {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    const providerLoader = providerToPropertyMap.get(provider) as Function

    res.status(200)
        .setHeader('Cache-Control', 'public, max-age=300')
        .json(await providerLoader())
}

export default providerHandler
