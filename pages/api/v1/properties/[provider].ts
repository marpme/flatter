import { NextApiRequest, NextApiResponse } from 'next'
import {
    providerToPropertyMap,
    SupportedProviders,
} from '../../../../lib/immo/available'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { provider } = req.query
    if (typeof provider !== 'string') {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    const supportedProvider = SupportedProviders[provider]
    if (!providerToPropertyMap.has(supportedProvider)) {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    console.log('Computing properties ...')
    const providerLoader = providerToPropertyMap.get(supportedProvider)

    res.status(200)
        .setHeader('Cache-Control', 'public, max-age=300')
        .json(await providerLoader())
}
