import Property, {
    PropertyFilterOption,
    PropertySortOption,
} from '../../types/Property'

export const loadProperties =
    (sort: PropertySortOption, filter: PropertyFilterOption) =>
    async (): Promise<Property[]> => {
        return (
            await fetch(`/api/v1/properties`, {
                headers: {
                    Accept: 'application/json',
                },
            })
        ).json()
    }

export const loadPropertyCount = async (): Promise<number> => {
    return (
        await fetch(`/api/v1/properties/count`, {
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}
