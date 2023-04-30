import { Grid, Text, useTheme } from '@geist-ui/core'
import Clock from '@geist-ui/icons/clock'
import { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { SITE_NAME } from './Head'

import { formatDistance } from 'date-fns'
import { useLocale } from '../hooks/useLocale'
import { IconText } from '../IconText'
import { useTranslation } from 'next-i18next'

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
    const { dateLocale } = useLocale()
    const { t } = useTranslation('common')
    const theme = useTheme()
    const [updatedDate, setUpdatedDate] = useState(calculateLastUpdatedDate())

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedDate(calculateLastUpdatedDate())
        }, 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    const indexedAgo = useMemo(
        () =>
            formatDistance(updatedDate, new Date(), {
                addSuffix: true,
                locale: dateLocale,
            }),
        [updatedDate, dateLocale]
    )

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
