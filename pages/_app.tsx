import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Analytics } from '@vercel/analytics/react'

import { PropertyProvider } from '../components/property/PropertyContext'
import { Database } from '../types/supabase'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
    const [supabaseClient] = useState(() =>
        createBrowserSupabaseClient<Database>()
    )

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            <PropertyProvider>
                <GeistProvider themeType={'light'}>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <Analytics />
                </GeistProvider>
            </PropertyProvider>
        </SessionContextProvider>
    )
}

export default appWithTranslation(App)
