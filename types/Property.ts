import { Organisation } from './Organisation'

export default interface Property {
    id: string
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
