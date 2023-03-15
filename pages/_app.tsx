import { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { appWithTranslation } from 'next-i18next'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

const App = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GeistProvider themeType={'light'}>
                <CssBaseline />
                <Component {...pageProps} />
                <Analytics />
            </GeistProvider>
        </QueryClientProvider>
    )
}

export default appWithTranslation(App)
