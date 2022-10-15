import sharp from 'sharp'

const config = {
    jpeg: { quality: 80 },
    webp: { quality: 80 },
    png: {compressionLevel: 8},
}

export const compressImage = async (content: ArrayBuffer) => {
    const image = sharp(Buffer.from(content))
    const meta = await image.metadata()
    const { format } = meta
    return image[format](config[format]).toBuffer()
}