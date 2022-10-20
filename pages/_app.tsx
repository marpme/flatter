import 'inter-ui/inter.css'
import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'
import { PropertyProvider } from '../components/property/PropertyContext'

export default function App({ Component, pageProps }: AppProps) {
    const [themeType, setThemeType] = useState('light')

    return (
        <PropertyProvider>
            <GeistProvider themeType={themeType}>
                <CssBaseline />
                <Component {...pageProps} />
            </GeistProvider>
        </PropertyProvider>
    )
}
