import { useState } from 'react'
import Property from '../../lib/Property'
import { loadProperties } from './PropertyLoader'

export const usePropertyStore = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [errors, setErrors] = useState<Error[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    return {
        properties,
        errors,
        isLoading,

        addProperties(...properties: Property[]): void {
            setProperties((currentProperties) =>
                [...currentProperties, ...properties].sort(
                    (propertyA, propertyB) =>
                        propertyA.sqmeterPriceRatio -
                        propertyB.sqmeterPriceRatio
                )
            )
        },

        replaceProperties(...properties: Property[]): void {
            setProperties(
                [...properties].sort(
                    (propertyA, propertyB) =>
                        propertyA.sqmeterPriceRatio -
                        propertyB.sqmeterPriceRatio
                )
            )
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
