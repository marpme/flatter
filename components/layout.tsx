import { Text } from '@geist-ui/core'
import Head from 'next/head'
import { FC, ReactElement } from 'react'

export const SITE_NAME = 'Flatter'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta
                    name="description"
                    content="Search the latest and greatest property deals for Berlin"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        SITE_NAME
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={SITE_NAME} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://flat.marpme.fyi" />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{SITE_NAME} ~ Berlin</title>
            </Head>
            <header>
                <Text h1 style={{ letterSpacing: '.03em' }}>
                    🏘️ {SITE_NAME}
                </Text>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default Layout
