import Property from '../../types/Property'

export const loadProperties = async (): Promise<Property[]> => {
    return (
        await fetch(`/api/v1/properties`, {
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}
