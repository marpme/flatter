import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/PrimsaClient'

const propertiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Cache-Control', 'public, max-age=300')

    return res.status(200).json({
        availableCount: await prisma.property.count({
            where: { deleted: false },
        }),
    })
}

export default propertiesHandler
