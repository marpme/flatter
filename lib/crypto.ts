import { createCipheriv, createDecipheriv } from 'crypto'

const CRYPTO_ALGORITHM = 'aes-128-cbc'

export const encryptImage = (imageUrl: string) => {
    const cipher = createCipheriv(
        CRYPTO_ALGORITHM,
        process.env.SERVICE_ENCRYPTION_KEY,
        process.env.SERVICE_ENCRYPTION_IV
    )

    let encrypted = cipher.update(imageUrl, 'utf8', 'base64url')
    encrypted += cipher.final('base64url')

    return encrypted
}

export const decryptImage = (imageUrl: string) => {
    const decipher = createDecipheriv(
        CRYPTO_ALGORITHM,
        process.env.SERVICE_ENCRYPTION_KEY,
        process.env.SERVICE_ENCRYPTION_IV
    )

    let decrypted = decipher.update(imageUrl, 'base64url', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}
