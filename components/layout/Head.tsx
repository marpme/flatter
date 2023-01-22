import { default as NextHead } from 'next/head'
import { FC } from 'react'

export const SITE_NAME = 'Flatter'

export const Head: FC = () => (
    <NextHead>
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
    </NextHead>
)
