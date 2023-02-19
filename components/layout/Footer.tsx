import { Link } from '@geist-ui/core'
import { Github, Twitter } from '@geist-ui/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { loadPropertyCount } from '../property/PropertyLoader'

export const Footer: FC = () => {
    const { t } = useTranslation('footer')
    const { data: count } = useQuery('propertyCount', loadPropertyCount)
    return (
        <div
            style={{
                display: 'flex',
                gap: '35px',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50px',
                marginTop: '50px',
            }}
        >
            {t('indexed', {
                amount: typeof count === 'number' ? count : 'loading',
            })}{' '}
            <span>&mdash;</span>
            {t('love')} <span>&mdash;</span>
            <Link
                href="https://github.com/marpme/flatter"
                style={{ alignItems: 'center', gap: '5px' }}
                color
            >
                <Github size={16} /> Github
            </Link>
            <Link
                href="https://twitter.com/marpme_"
                style={{ alignItems: 'center', gap: '5px' }}
                color
            >
                <Twitter size={16} /> Twitter
            </Link>
        </div>
    )
}
