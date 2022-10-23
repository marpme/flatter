import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { PropertyProvider } from '../components/property/PropertyContext'

export { reportWebVitals } from 'next-axiom'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PropertyProvider>
            <GeistProvider themeType={'light'}>
                <CssBaseline />
                <Component {...pageProps} />
            </GeistProvider>
        </PropertyProvider>
    )
}
