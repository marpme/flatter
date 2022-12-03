import { Card, Grid, Input, ButtonGroup, Button, Text } from '@geist-ui/core'
import { Filter, Star, DollarSign, Award } from '@geist-ui/icons'
import { useContext, useState, FC } from 'react'
import { PropertyContext } from '../property/PropertyContext'

export const FilterBar: FC = () => {
    const { properties } = useContext(PropertyContext)

    const priceList = properties.map((prop) => prop.price)

    const [minPrice, setMinPrice] = useState<string>(
        Math.floor(Math.min(...priceList)).toString()
    )
    const [maxPrice, setMaxPrice] = useState<string>(
        Math.ceil(Math.max(...priceList)).toString()
    )

    return (
        <Grid xs={24}>
            <Card paddingBottom={0} width={'100%'}>
                <Grid.Container alignItems="center">
                    <Grid xs={24} alignItems="center">
                        <Filter
                            size={13}
                            style={{
                                fontSize: '13px',
                                margin: '0',
                                padding: '0',
                            }}
                        />
                        <Text
                            b
                            data-testid="filter-header"
                            marginRight={1}
                            style={{
                                fontSize: '13px',
                                lineHeight: 'initial',
                                margin: '0 0 0 0.5em',
                                padding: '0',
                            }}
                        >
                            Filters ({properties.length} out of{' '}
                            {properties.length})
                        </Text>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                        <Input
                            data-testid="price-min"
                            placeholder="200"
                            labelRight="€/mo"
                            scale={2 / 3}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <Text mx={0.5}>-</Text>
                        <Input
                            data-testid="price-max"
                            placeholder="1000"
                            labelRight="€/mo"
                            scale={2 / 3}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <ButtonGroup data-testid="quick-buttons">
                            <Button icon={<Star />} height={'30px'}>
                                Favorites
                            </Button>
                            <Button icon={<DollarSign />} height={'30px'}>
                                Recommended
                            </Button>
                            <Button icon={<Award />} height={'30px'}>
                                Special (WBS)
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid.Container>
            </Card>
        </Grid>
    )
}
