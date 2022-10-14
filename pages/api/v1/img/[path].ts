import { NextApiResponse } from 'next'
import { decryptImage } from '../../../../lib/crypto'

export const config = {
    api: {
        responseLimit: '8mb',
    },
}

export default async (req, res: NextApiResponse) => {
    if (!req.query.path) {
        res.status(404).send(null)
    }

    try {
        const imageToLoad = decryptImage(req.query.path)
        const imageResponse = await fetch(imageToLoad)
        const imageType = await imageResponse.headers.get('Content-Type')
        const imageContent = await imageResponse.arrayBuffer()

        res.status(200)
            .setHeader('Content-Type', imageType)
            .send(Buffer.from(imageContent))
    } catch (e) {
        console.error(e)
        res.status(500).send(null)
    }
}
