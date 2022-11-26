import { useState } from 'react'
import Property from '../../lib/Property'
import { loadProperties } from './PropertyLoader'

export type PropertyWithOccurrences = Property & { occurrences: number }

export const unifyProperties = (
    properties: Property[]
): PropertyWithOccurrences[] => {
    const addressToProperties = properties.reduce<Record<string, Property[]>>(
        (all, property) => ({
            ...all,
            [property.address]: [...(all[property.address] ?? []), property],
        }),
        {}
    )

    console.log(addressToProperties)
    return Object.keys(addressToProperties)
        .map((address) => ({
            ...addressToProperties[address][0],
            occurrences: addressToProperties[address].length,
        }))
        .sort(
            (propertyA, propertyB) =>
                propertyA.sqmeterPriceRatio - propertyB.sqmeterPriceRatio
        )
}

export const usePropertyStore = () => {
    const [properties, setProperties] = useState<PropertyWithOccurrences[]>([])
    const [errors, setErrors] = useState<Error[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    return {
        properties,
        errors,
        isLoading,

        addProperties(...properties: Property[]): void {
            setProperties((currentProperties) =>
                unifyProperties([...currentProperties, ...properties])
            )
        },

        replaceProperties(...properties: Property[]): void {
            setProperties(unifyProperties([...properties]))
        },

        addError(error: Error): void {
            setErrors((currentErrors) => [...currentErrors, error])
        },

        async initializeStore() {
            if (isLoading) {
                return
            }

            setLoading(true)

            const results = loadProperties()
                .then((properties) => this.addProperties(...properties))
                .catch((error) => {
                    this.addError(error)
                })

            results.then(() => {
                setLoading(false)
            })
        },
    }
}

export type PropertyStore = ReturnType<typeof usePropertyStore>
