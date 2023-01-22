import { Grid, Spacer, Text, useTheme } from '@geist-ui/core'
import { Clock } from '@geist-ui/icons'
import { FC, ReactElement, useEffect, useMemo, useState } from 'react'
import { SITE_NAME } from './Head'

import { formatDistance } from 'date-fns'
import { useLocale } from '../hooks/useLocale'
import { IconText } from '../IconText'

const calculateLastUpdatedDate = () => {
    const currentDate = new Date()
    const lastUpdatedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        0,
        0,
        0
    )
    return lastUpdatedDate
}

export const Header: FC<{ subHeader: ReactElement }> = ({ subHeader }) => {
    const { dateLocale } = useLocale()
    const theme = useTheme()
    const [updatedDate, setUpdatedDate] = useState(calculateLastUpdatedDate())

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedDate(calculateLastUpdatedDate())
        }, 60 * 1000)

        return () => clearInterval(interval)
    }, [])

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
            <Grid xs style={{ flexDirection: 'row-reverse' }}>
                <IconText
                    IconElement={Clock}
                    style={{ color: theme.palette.accents_4 }}
                >
                    Indexed{' '}
                    {formatDistance(updatedDate, new Date(), {
                        addSuffix: true,
                        locale: dateLocale,
                    })}
                </IconText>
            </Grid>
            <Grid xs={24}>{subHeader}</Grid>
        </Grid.Container>
    )
}
