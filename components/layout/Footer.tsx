import { Grid, Link } from '@geist-ui/core'
import Twitter from '@geist-ui/icons/twitter'
import Github from '@geist-ui/icons/github'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { loadPropertyCount } from '../property/PropertyLoader'

export const Footer: FC = () => {
    const { t } = useTranslation('footer')
    const { data } = useQuery(['propertyCount'], loadPropertyCount)
    return (
        <Grid.Container
            marginTop={4}
            marginBottom={4}
            gap={1}
            justify={'center'}
            alignItems={'center'}
        >
            <Grid xs={24} md={3} justify={'center'} alignItems={'center'}>
                {t('indexed', {
                    amount:
                        typeof data?.count === 'number'
                            ? data.count
                            : 'loading',
                })}{' '}
            </Grid>
            <Grid xs={0} md={1}>
                <span>&mdash;</span>
            </Grid>
            <Grid xs={24} md={3} justify={'center'} alignItems={'center'}>
                {t('love')}{' '}
            </Grid>
            <Grid xs={0} md={1}>
                <span>&mdash;</span>
            </Grid>
            <Grid xs={12} md={2} justify={'center'} alignItems={'center'}>
                <Link
                    href="https://github.com/marpme/flatter"
                    style={{ alignItems: 'center', gap: '5px' }}
                    color
                >
                    <Github size={16} /> Github
                </Link>
            </Grid>
            <Grid xs={12} md={2} justify={'center'} alignItems={'center'}>
                <Link
                    href="https://twitter.com/marpme_"
                    style={{ alignItems: 'center', gap: '5px' }}
                    color
                >
                    <Twitter size={16} /> Twitter
                </Link>
            </Grid>
        </Grid.Container>
    )
}
