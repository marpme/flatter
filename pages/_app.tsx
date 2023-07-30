import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { useState } from 'react'

import { appWithTranslation } from 'next-i18next'

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    new QueryClient({
      queryCache,
    })
  )

  return (
    <>
      <Head>
        <title>Flatter ~ Berlin</title>
        <meta property="description" content="Search engine description" />
        <meta property="og:image" content="https://flat.marpme.fyi/api/og" />
        <meta
          property="og:title"
          content="Reliable, High-Availability Property Listings - Your Dream Home Awaits"
        />
        <meta
          property="og:description"
          content="Discover your dream property with ease and peace of mind, thanks to our reliable and high-availability listing service for real estate."
        />
        <meta property="og:url" content="https://flat.marpme.fyi/" />
        {/* Twitter specifics */}
        <meta
          property="twitter:image"
          content="Twitter link preview image URL"
        />
        <meta
          property="twitter:card"
          content="https://flat.marpme.fyi/api/og"
        />
        <meta
          property="twitter:title"
          content="Reliable, High-Availability Property Listings - Your Dream Home Awaits"
        />
        <meta
          property="twitter:description"
          content="Discover your dream property with ease and peace of mind, thanks to our reliable and high-availability listing service for real estate."
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GeistProvider themeType={'light'}>
          <CssBaseline />
          <Component {...pageProps} />
        </GeistProvider>
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(App)
