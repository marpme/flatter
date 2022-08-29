import { NextApiResponse } from 'next'
import { decryptImage } from '../../../../lib/crypto'

export default async (req, res: NextApiResponse) => {
    if (req.query.path) {
        const imageToLoad = decryptImage(req.query.path)

        const imageResponse = await fetch(imageToLoad)
        const imageType = await imageResponse.headers.get('Content-Type')
        const imageContent = await imageResponse.arrayBuffer()

        res.status(200)
            .setHeader('Content-Type', imageType)
            .send(Buffer.from(imageContent))
        return
    }

    res.status(200).send(null)
}
