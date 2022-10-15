import { encryptImage } from './crypto'

export const imageifyLink = (url) => {
    return `/api/v1/img/${encryptImage(url)}`
}
