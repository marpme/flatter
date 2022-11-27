import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { PropertyProvider } from '../components/property/PropertyContext'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../types/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export { reportWebVitals } from 'next-axiom'

export default function App({ Component, pageProps }: AppProps) {
    const [supabaseClient] = useState(() =>
        createBrowserSupabaseClient<Database>()
    )

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            <PropertyProvider>
                <GeistProvider themeType={'light'}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </GeistProvider>
            </PropertyProvider>
        </SessionContextProvider>
    )
}
