import { Card, Grid, Input, ButtonGroup, Button, Text } from '@geist-ui/core'
import { Filter, Star, DollarSign, Award } from '@geist-ui/icons'
import { FC } from 'react'
import Property from '../../lib/Property'

export const FilterBar: FC<{ properties: Property[] }> = ({ properties }) => {
    return (
        <Card
            shadow
            paddingBottom={0}
            style={{
                border: '1px solid #eaeaea',
                borderRadius: '0.5em',
                width: '100%',
                background: '#fff',
            }}
        >
            <Grid.Container alignItems="center">
                <Grid xs={24} alignItems="center">
                    <Filter
                        size={13}
                        style={{
                            color: '#666',
                            fontSize: '13px',
                            margin: '0',
                            padding: '0',
                        }}
                    />
                    <Text
                        b
                        marginRight={1}
                        style={{
                            color: '#666',
                            fontSize: '13px',
                            lineHeight: 'initial',
                            margin: '0 0 0 0.5em',
                            padding: '0',
                        }}
                    >
                        Filters ({properties.length} out of {properties.length})
                    </Text>
                </Grid>
                <Grid xs={12} alignItems="center">
                    <Input placeholder="200" labelRight="€/mo" scale={2 / 3} />
                    <Text mx={0.5} style={{ color: '#666' }}>
                        -
                    </Text>
                    <Input placeholder="1000" labelRight="€/mo" scale={2 / 3} />
                </Grid>
                <Grid xs={12}>
                    <ButtonGroup>
                        <Button icon={<Star />} scale={2 / 3}>
                            Favorites
                        </Button>
                        <Button icon={<DollarSign />} scale={2 / 3}>
                            Recommended
                        </Button>
                        <Button icon={<Award />} scale={2 / 3}>
                            Special (WBS)
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid.Container>
        </Card>
    )
}
