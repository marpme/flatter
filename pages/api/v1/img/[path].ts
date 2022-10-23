import { NextApiHandler, NextApiResponse } from 'next'
import { decryptImage } from '../../../../lib/image/crypto'
import { compressImage } from '../../../../lib/image/compression'

export const config = {
    api: {
        responseLimit: '3mb',
    },
}

const cacheMap = new Map()

const imageHandler: NextApiHandler = async (req, res) => {
    if (!req.query.path || typeof req.query.path === 'string') {
        res.status(404).send(null)
    }

    res.setHeader('Cache-Control', 's-maxage=86400')

    try {
        const imageToLoad = decryptImage(req.query.path as string)
        if (cacheMap.has(imageToLoad)) {
            const { imageType, imageContent } = cacheMap.get(imageToLoad)
            res.status(200)
                .setHeader('Content-Type', imageType)
                .send(imageContent)
            return
        }

        const imageResponse = await fetch(imageToLoad)
        const imageType = String(
            await imageResponse.headers.get('Content-Type')
        )
        const imageContent = await compressImage(
            await imageResponse.arrayBuffer()
        )

        cacheMap.set(imageToLoad, { imageType, imageContent })
        res.status(200).setHeader('Content-Type', imageType).send(imageContent)
    } catch (e) {
        console.error(e)
        res.status(500).send(null)
    }
}

export default imageHandler
