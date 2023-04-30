import {
    Badge,
    Button,
    Card,
    Fieldset,
    Grid,
    Image,
    Link,
    Spacer,
    Text,
} from '@geist-ui/core'
import Tag from '@geist-ui/icons/tag'
import Square from '@geist-ui/icons/square'
import AlertTriangle from '@geist-ui/icons/alertTriangle'
import DollarSign from '@geist-ui/icons/dollarSign'
import Navigation from '@geist-ui/icons/navigation'
import Clock from '@geist-ui/icons/clock'
import Check from '@geist-ui/icons/check'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import styles from './PropertyComponent.module.css'
import { TextHighlighter } from '../TextHighlighter'
import { useLocale } from '../hooks/useLocale'
import { formatDistance } from 'date-fns'
import Property from '../../types/Property'

export const PropertyComponent: FC<{
    property: Property
}> = ({ property }) => {
    const { dateLocale } = useLocale()
    const { t } = useTranslation('common')
    const indexedAgo = useMemo(
        () =>
            formatDistance(new Date(property.created_at!), new Date(), {
                addSuffix: true,
                locale: dateLocale,
            }),
        [property, dateLocale]
    )

    return (
        <Card
            data-testid="property-component"
            shadow
            width="100%"
            className={styles.propertyCard}
        >
            <Badge.Anchor placement="topRight">
                <Image
                    alt="the property's image"
                    src={property.imageLinks[0]}
                    height="200px"
                    width="100%"
                    draggable={false}
                    className={styles.previewImage}
                    placeholder="blur"
                    loading="lazy"
                />
            </Badge.Anchor>
            <Card.Content>
                <Text h5>{t('description')} </Text>
                {property.wbs ? (
                    <Badge type={property.wbs ? 'warning' : 'success'}>
                        <div
                            style={{
                                display: 'flex',
                                gap: '5px',
                                justifyContent: 'center',
                                alignContent: 'center',
                                margin: '0 2px',
                            }}
                        >
                            <AlertTriangle size="14" /> WBS required
                        </div>
                    </Badge>
                ) : null}
                <Spacer />
                <TextHighlighter
                    text={property.headline}
                    highlight={'WBS'}
                    tooltip={<>{t('wbsDisclaimer')}</>}
                />
            </Card.Content>
            <Card.Content width={'100%'} className={styles.propertyCardContent}>
                <Grid.Container gap={1}>
                    <Grid xs={3}>
                        <DollarSign />
                    </Grid>
                    <Grid
                        xs={20}
                        justify="flex-start"
                        alignContent="flex-start"
                    >
                        {(
                            Math.round(
                                (property.price / property.sqmeter) * 100
                            ) / 100
                        ).toFixed(2)}{' '}
                        €/m²
                    </Grid>
                    <Grid xs={3}>
                        <Tag />
                    </Grid>
                    <Grid
                        xs={20}
                        justify="flex-start"
                        alignContent="flex-start"
                    >
                        {property.price.toFixed(2)} €/mo
                    </Grid>
                    <Grid xs={3}>
                        <Square />
                    </Grid>
                    <Grid
                        xs={20}
                        justify="flex-start"
                        alignContent="flex-start"
                    >
                        {property.roomCount}{' '}
                        {t('room', { count: property.roomCount })} {t('with')}{' '}
                        {property.sqmeter.toFixed(2)} m²
                    </Grid>
                    <Grid xs={3}>
                        <Navigation />
                    </Grid>
                    <Grid
                        xs={20}
                        justify="flex-start"
                        alignContent="flex-start"
                    >
                        <Link
                            color
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.google.com/maps?q=${encodeURIComponent(
                                property.address
                            )}`}
                            style={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {property.address}
                        </Link>
                    </Grid>
                    <Grid xs={3}>
                        <Clock />
                    </Grid>
                    <Grid
                        xs={20}
                        justify="flex-start"
                        alignContent="flex-start"
                    >
                        {t('insertedAt', { indexedAgo })}
                    </Grid>
                </Grid.Container>
            </Card.Content>
            <Fieldset.Footer>
                <Spacer />
                <Button
                    icon={<Check />}
                    type="success"
                    scale={2 / 3}
                    onClick={() => {
                        window.open(
                            property.propertyLink,
                            '_blank',
                            'noreferrer=true'
                        )
                    }}
                >
                    {t('apply')}
                </Button>
            </Fieldset.Footer>
        </Card>
    )
}
