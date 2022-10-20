import Property from '../../lib/Property'

export const loadAvailablePropertyProvider = async (): Promise<string[]> => {
    return (
        await fetch('/api/v1/properties/available', {
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}

export const loadPropertyByProvider = async (
    provider: string
): Promise<Property[]> => {
    return (
        await fetch(`/api/v1/properties/${provider}`, {
            headers: {
                Accept: 'application/json',
            },
        })
    ).json()
}
