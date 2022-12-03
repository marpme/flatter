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
    Tooltip,
} from '@geist-ui/core'
import { Square, Navigation, Tag, DollarSign, Check } from '@geist-ui/icons'
import { FC } from 'react'

import styles from './PropertyComponent.module.css'
import { PropertyWithOccurrences } from './PropertyStore'
import { TextHighlighter } from '../TextHighlighter'

export const PropertyComponent: FC<{
    property: PropertyWithOccurrences
}> = ({ property }) => (
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
            {property.occurrences > 1 ? (
                <Tooltip
                    text={
                        'similar properties under the same address were hidden'
                    }
                    type="success"
                    className={styles.absoluteTooltip}
                >
                    <Badge type="success" title="similar">
                        {property.occurrences}
                    </Badge>
                </Tooltip>
            ) : null}
        </Badge.Anchor>
        <Card.Content>
            <Text h5>Description: </Text>
            <TextHighlighter
                text={property.headline}
                highlight={'WBS'}
                tooltip={
                    <>requires special legal obligation to rent this object</>
                }
            />
        </Card.Content>
        <Card.Content width={'100%'} className={styles.propertyCardContent}>
            <Grid.Container gap={1}>
                <Grid xs={3}>
                    <DollarSign />
                </Grid>
                <Grid xs={20} justify="flex-start" alignContent="flex-start">
                    {(
                        Math.round((property.price / property.sqmeter) * 100) /
                        100
                    ).toFixed(2)}{' '}
                    €/m²
                </Grid>
                <Grid xs={3}>
                    <Tag />
                </Grid>
                <Grid xs={20} justify="flex-start" alignContent="flex-start">
                    {property.price.toFixed(2)} €/mo
                </Grid>
                <Grid xs={3}>
                    <Square />
                </Grid>
                <Grid xs={20} justify="flex-start" alignContent="flex-start">
                    {property.sqmeter.toFixed(2)} m²
                </Grid>
                <Grid xs={3}>
                    <Navigation />
                </Grid>
                <Grid xs={20} justify="flex-start" alignContent="flex-start">
                    <Link
                        color
                        rel="noreferrer"
                        target="_blank"
                        href={`https://www.google.com/maps?q=${encodeURIComponent(
                            property.address
                        )}`}
                    >
                        {property.address}
                    </Link>
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
                Apply
            </Button>
        </Fieldset.Footer>
    </Card>
)
