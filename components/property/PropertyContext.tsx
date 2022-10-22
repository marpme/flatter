import { createContext, FC, useEffect } from 'react'
import { createPropertyStore, PropertyStore } from './PropertyStore'

export const PropertyContext = createContext<PropertyStore>({
    properties: [],
    isLoading: false,
    errors: [],
    initializeStore() {
        throw new Error()
    },
    addProperties() {
        throw new Error()
    },
    addError() {
        throw new Error()
    },
})

export const PropertyProvider: FC = ({ children }) => {
    const store = createPropertyStore()

    useEffect(() => {
        store.initializeStore()
    }, [])

    return (
        <PropertyContext.Provider value={store}>
            {children}
        </PropertyContext.Provider>
    )
}
