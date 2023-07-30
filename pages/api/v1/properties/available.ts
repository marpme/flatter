import { NextApiHandler } from 'next'
import { Organisation } from '../../../../types/Organisation'

const AvailableProviderHandler: NextApiHandler<string[]> = async (req, res) => {
  return res
    .status(200)
    .setHeader('Cache-Control', 'public, max-age=300')
    .json(Object.keys(Organisation))
}

export default AvailableProviderHandler
