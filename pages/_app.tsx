import 'inter-ui/inter.css'
import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    const [themeType, setThemeType] = useState('light')
    const switchThemes = () => {
        setThemeType((last) => (last === 'dark' ? 'light' : 'dark'))
    }

    return (
        <GeistProvider themeType={themeType}>
            <CssBaseline />
            <Component {...pageProps} />
        </GeistProvider>
    )
}
