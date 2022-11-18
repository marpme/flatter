import React, { createContext, FC, ReactElement, useEffect } from 'react'
import { usePropertyStore, PropertyStore } from './PropertyStore'

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
    replaceProperties() {
        throw new Error()
    },
    addError() {
        throw new Error()
    },
})

export const PropertyProvider: FC<{
    children: ReactElement | ReactElement[]
}> = ({ children }) => {
    const store = usePropertyStore()

    useEffect(() => {
        store.initializeStore()
    }, [store])

    return (
        <PropertyContext.Provider value={store}>
            {children}
        </PropertyContext.Provider>
    )
}
