const { i18n } = require('./next-i18next.config')
const { version } = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'

const contentSecurityPolicy = `
  default-src 'self'; 
  script-src 'self' ${
      isProduction
          ? ''
          : "'unsafe-eval' https://cdn.vercel-insights.com/v1/script.debug.js"
  }; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' https://immosuche.degewo.de https://www.howoge.de https://www.gesobau.de;
  font-src 'self'; 
  connect-src 'self' https://vwyenwcswzuupzimdxud.supabase.co https://vitals.vercel-insights.com/v1/vitals; 
  media-src 'none';
  object-src 'none';
  frame-ancestors 'none'
`

/**
 * @type {import('next').NextConfig}
 **/
const config = {
    swcMinify: true,
    i18n,
    publicRuntimeConfig: {
        version,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: contentSecurityPolicy
                            .replace(/\s{2,}/g, ' ')
                            .trim(),
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer',
                    },
                ],
            },
        ]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config)
