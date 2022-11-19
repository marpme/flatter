import { NextApiRequest, NextApiResponse } from 'next'
import {
    providerToPropertyMap,
    SupportedProviders,
} from '../../../../lib/immo/available'

const providerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { provider } = req.query
    if (typeof provider !== 'string') {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    const supportedProvider =
        SupportedProviders[provider as keyof typeof SupportedProviders]
    if (!providerToPropertyMap[supportedProvider]) {
        res.status(400).json({ error: 'invalid provider' })
        return
    }

    const providerLoader = providerToPropertyMap[supportedProvider]

    res.status(200)
        .setHeader('Cache-Control', 'public, max-age=300')
        .json(await providerLoader())
}

export default providerHandler
