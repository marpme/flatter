import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Analytics } from '@vercel/analytics/react'

import { Database } from '../types/supabase'
import { appWithTranslation } from 'next-i18next'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

const App = ({ Component, pageProps }: AppProps) => {
    const [supabaseClient] = useState(() =>
        createBrowserSupabaseClient<Database>()
    )

    const [queryClient] = useState(new QueryClient())

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GeistProvider themeType={'light'}>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <Analytics />
                </GeistProvider>
            </QueryClientProvider>
        </SessionContextProvider>
    )
}

export default appWithTranslation(App)
