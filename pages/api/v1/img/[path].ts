import { NextApiHandler } from 'next'
import { decryptImage } from '../../../../lib/image/crypto'
import { compressImage } from '../../../../lib/image/compression'

export const config = {
    api: {
        responseLimit: '3mb',
    },
}

type CacheData = { imageType: string; imageContent: Buffer }
const cacheMap: Record<string, CacheData> = {}

const imageHandler: NextApiHandler = async (req, res) => {
    const { path } = req.query
    if (!path || typeof path !== 'string') {
        return res.status(404).send(null)
    }

    res.setHeader('Cache-Control', 's-maxage=86400')

    try {
        const imageToLoad = decryptImage(path)
        if (cacheMap[imageToLoad]) {
            const { imageType, imageContent } = cacheMap[imageToLoad]
            return res
                .status(200)
                .setHeader('Content-Type', imageType)
                .send(imageContent)
        }

        const imageResponse = await fetch(imageToLoad)
        const imageType = String(
            await imageResponse.headers.get('Content-Type')
        )
        const imageContent = await compressImage(
            await imageResponse.arrayBuffer()
        )

        cacheMap[imageToLoad] = { imageType, imageContent }
        return res
            .status(200)
            .setHeader('Content-Type', imageType)
            .send(imageContent)
    } catch (e) {
        console.error(e)
        return res.status(500).send(null)
    }
}

export default imageHandler
