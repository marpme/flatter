import { Card, Grid, Image, Link, Text, Tooltip } from '@geist-ui/core'
import {
    Square,
    Navigation,
    Tag,
    DollarSign,
    AlertTriangle,
} from '@geist-ui/icons'
import { useMemo } from 'react'
import Property from '../../lib/Property'

const TextScanner: React.FC<{ text: string }> = ({ text }) => {
    const texts = useMemo(() => {
        return text
            .split('WBS')
            .map((text) => <span>{text}</span>)
            .reduce((prev, curr) => {
                return (
                    <>
                        {prev}{' '}
                        {
                            <Tooltip
                                type="dark"
                                text={
                                    <>
                                        Please verify if you are eligble for WBS
                                        via{' '}
                                        <Link
                                            color
                                            icon
                                            target="_blank"
                                            href="https://service.berlin.de/dienstleistung/120671/"
                                        >
                                            this gov page.
                                        </Link>
                                    </>
                                }
                            >
                                <AlertTriangle size={12} />
                                <Text b em>
                                    WBS
                                </Text>
                            </Tooltip>
                        }{' '}
                        {curr}
                    </>
                )
            })
    }, [text])

    return <Text>{texts}</Text>
}

export const PropertyComponent: React.FC<{ property: Property }> = ({
    property,
}) => (
    <Card shadow width="100%">
        <Image
            src={property.imageLinks[0]}
            height="200px"
            width="100%"
            draggable={false}
            style={{ objectFit: 'cover' }}
        />
        <Card.Content>
            <Text h5>Description: </Text>
            <TextScanner text={property.headline} />
        </Card.Content>
        <Card.Content width={'100%'}>
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
                    {property.address}
                </Grid>
            </Grid.Container>
        </Card.Content>
        <Card.Footer disableAutoMargin>
            <Link color icon target="_blank" href={property.propertyLink}>
                Visit the property on the original source
            </Link>
        </Card.Footer>
    </Card>
)
