import { Organisation } from './Organisation'

export default interface Property {
    id: string
    created_at?: string
    org: Organisation
    address: string
    headline: string

    // filterable fields
    price: number
    wbs: boolean
    roomCount: number
    sqmeter: number

    thumbnail: string
    imageLinks: string[]
    propertyLink: string
}

export type PropertyFilterOption = {
    price: {
        min: number
        max: number
    }
    /* TODO: Enable filters later
    roomCount: {
        min: number
    }
    sqmeter: {
        min: number
    }*/
    wbs: boolean
}

export const propertySortValues = ['inserted', 'price', 'sqmeter'] as const
export type PropertySortOption = (typeof propertySortValues)[number]
