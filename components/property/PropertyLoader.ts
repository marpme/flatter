import Property, {
    PropertyFilterOption,
    PropertySortOption,
} from '../../types/Property'

export const loadProperties =
    (sort: PropertySortOption, filter: PropertyFilterOption) =>
    async (): Promise<Property[]> => {
        return (
            await fetch(`/api/v1/properties`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    ['Content-Type']: 'application/json',
                },
                body: JSON.stringify({ sort, filter }),
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
