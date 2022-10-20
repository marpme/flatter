import { useState } from 'react'
import Property from '../../lib/Property'
import {
    loadAvailablePropertyProvider,
    loadPropertyByProvider,
} from './PropertyLoader'

export const createPropertyStore = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    return {
        properties,
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

        async initializeStore() {
            if (isLoading) {
                return
            }

            setLoading(true)

            const propertyProviderAvailable =
                await loadAvailablePropertyProvider()

            const results = propertyProviderAvailable
                .map((provider) => loadPropertyByProvider(provider))
                .map((dataPromise) => {
                    dataPromise.then((properties) =>
                        this.addProperties(...properties)
                    )
                })

            Promise.allSettled(results).then(() => {
                setLoading(false)
            })
        },
    }
}

export type PropertyStore = ReturnType<typeof createPropertyStore>
