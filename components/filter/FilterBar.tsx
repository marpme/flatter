import { Card, Grid, Input, ButtonGroup, Button, Text } from '@geist-ui/core'
import { Filter, Star, DollarSign, Award } from '@geist-ui/icons'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useContext, useEffect, useState } from 'react'
import { FC } from 'react'
import { Organisation } from '../../lib/Organisation'
import { Database } from '../../types/supabase'
import { PropertyContext } from '../property/PropertyContext'

export const FilterBar: FC = () => {
    const { properties, replaceProperties } = useContext(PropertyContext)
    const supabaseClient = useSupabaseClient<Database>()

    const priceList = properties.map((prop) => prop.price)

    const [minPrice, setMinPrice] = useState<string>(
        Math.floor(Math.min(...priceList)).toString()
    )
    const [maxPrice, setMaxPrice] = useState<string>(
        Math.ceil(Math.max(...priceList)).toString()
    )

    useEffect(() => {
        console.log(supabaseClient)
        const fetchNewProperties = async () => {
            const { data: properties } = await supabaseClient
                .from('properties')
                .select('*')
                .gt('price', minPrice)
                .lt('price', maxPrice)

            if (properties) {
                replaceProperties(
                    ...properties.map((prop) => ({
                        ...prop,
                        org: Organisation[
                            prop.org as keyof typeof Organisation
                        ],
                        sqmeterPriceRatio: prop.price / prop.sqmeter,
                        imageLinks: prop.imageLinks as string[],
                    }))
                )
            }
        }
        fetchNewProperties()
    }, [minPrice, maxPrice, supabaseClient])

    return (
        <Card
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
                    <Input
                        placeholder="200"
                        labelRight="€/mo"
                        scale={2 / 3}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <Text mx={0.5} style={{ color: '#666' }}>
                        -
                    </Text>
                    <Input
                        placeholder="1000"
                        labelRight="€/mo"
                        scale={2 / 3}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
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
