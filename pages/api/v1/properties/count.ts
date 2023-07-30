import { NextApiRequest, NextApiResponse } from 'next'
import { getUpdateTimestamp } from '../../../../lib/RedisClient'
import { prisma } from '../../../../lib/PrimsaClient'

const propertiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const count = await prisma.property.count()

  res.setHeader('Cache-Control', 'public, max-age=300')

  return res.status(200).json({
    count,
    updateTimestamp: await getUpdateTimestamp(),
  })
}

export default propertiesHandler
