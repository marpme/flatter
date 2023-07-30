import { sort } from 'ramda'
import Property, {
    PropertyFilterOption,
    PropertySortOption,
} from '../../types/Property'

export const loadProperties =
    (sort: PropertySortOption, filter: PropertyFilterOption) =>
    async (): Promise<Property[]> => {
        const parameters = new URLSearchParams()

        parameters.set('sort', sort)
        parameters.set('priceMin', String(filter.price.min))
        parameters.set('priceMax', String(filter.price.max))
        parameters.set('wbs', String(filter.wbs))

        return (
            await fetch(`/api/v1/properties?${parameters.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            })
        ).json()
    }

export const loadPropertyCount = async (): Promise<{
    count: number
    updateTimestamp: number
}> => {
    return (
        await fetch(`/api/v1/properties/count`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}

export const loadAvailablePropertyCount = async (): Promise<{
    availableCount: number
}> => {
    return (
        await fetch(`/api/v1/properties/availableCount`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}
