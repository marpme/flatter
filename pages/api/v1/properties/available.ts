import { NextApiHandler } from 'next'
import { SupportedProviders } from '../../../../lib/immo/available'

const AvailableProviderHandler: NextApiHandler<string[]> = async (req, res) => {
    return res
        .status(200)
        .setHeader('Cache-Control', 'public, max-age=300')
        .json(Object.keys(SupportedProviders))
}

export default AvailableProviderHandler
