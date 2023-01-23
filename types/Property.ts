import { Organisation } from './Organisation'

export default interface Property {
    id: string
    created_at?: string
    org: Organisation
    address: string
    price: number
    sqmeter: number
    sqmeterPriceRatio: number
    headline: string

    thumbnail: string
    imageLinks: string[]
    propertyLink: string
}
