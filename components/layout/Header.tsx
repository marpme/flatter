import { Grid, Text, useTheme } from '@geist-ui/core'
import Clock from '@geist-ui/icons/clock'
import { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { SITE_NAME } from './Head'

import { formatDistance } from 'date-fns'
import { useLocale } from '../hooks/useLocale'
import { IconText } from '../IconText'
import { useTranslation } from 'next-i18next'
import { useQuery } from '@tanstack/react-query'
import { loadPropertyCount } from '../property/PropertyLoader'

const calculateLastUpdatedDate = () => {
    const currentDate = new Date()
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        0,
        0,
        0
    )
}

export const Header: FC<{ subHeader: ReactElement }> = ({ subHeader }) => {
    const { t } = useTranslation('common')
    const theme = useTheme()

    const { dateLocale } = useLocale()
    const { data } = useQuery(['propertyCount'], loadPropertyCount)

    const indexedAgo = useMemo(() => {
        if (!data?.updateTimestamp) {
            return 'loading'
        }

        return formatDistance(new Date(data?.updateTimestamp), new Date(), {
            addSuffix: true,
            locale: dateLocale,
        })
    }, [data?.updateTimestamp, dateLocale])

    return (
        <Grid.Container
            style={{
                marginBottom: '2em',
            }}
        >
            <Grid xs>
                <Text
                    h1
                    style={{ letterSpacing: '.03em' }}
                    data-testid="header-name"
                >
                    🏘️ {SITE_NAME}
                </Text>
            </Grid>
            <Grid xs={0} md={8} justify={'flex-end'}>
                <IconText
                    IconElement={Clock}
                    style={{ color: theme.palette.accents_4 }}
                >
                    {t('indexed', {
                        ago: indexedAgo,
                    })}
                </IconText>
            </Grid>
            <Grid xs={24}>{subHeader}</Grid>
        </Grid.Container>
    )
}
