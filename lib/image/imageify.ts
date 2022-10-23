import { encryptImage } from './crypto'

export const imageifyLink = (url: string) => {
    return `/api/v1/img/${encryptImage(url)}`
}
