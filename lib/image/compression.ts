import sharp from 'sharp'

export const compressImage = async (content: ArrayBuffer) => {
    const image = sharp(Buffer.from(content))

    return image
        .png({compressionLevel: 6})
        .jpeg({ quality: 60 })
        .webp({ quality: 60 })
        .resize(500)
        .toBuffer()
}