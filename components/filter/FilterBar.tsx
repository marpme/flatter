import {
    Card,
    Grid,
    Input,
    ButtonGroup,
    Button,
    Text,
    Select,
} from '@geist-ui/core'
import { Filter, DollarSign, Award } from '@geist-ui/icons'
import { useState, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useQuery } from 'react-query'
import { loadProperties } from '../property/PropertyLoader'

export const FilterBar: FC = () => {
    const { t } = useTranslation('common')
    const {
        error,
        data: properties,
        isLoading,
    } = useQuery('properties', loadProperties)

    if (error || isLoading || !properties) {
        return null
    }

    const priceList = properties.map((prop) => prop.price)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [minPrice, setMinPrice] = useState<string>(
        Math.floor(Math.min(...priceList)).toString()
    )
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
                            {t('filter', {
                                amount: properties.length,
                                maxAmount: properties.length,
                            })}
                        </Text>
                    </Grid>
                    <Grid xs={8} alignItems="center">
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
                    <Grid xs={8} alignItems="center">
                        <ButtonGroup data-testid="quick-buttons">
                            <Button icon={<DollarSign />} height={'30px'}>
                                {t('recommended')}
                            </Button>
                            <Button icon={<Award />} height={'30px'}>
                                {t('special')}
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid xs={8} justify="flex-end">
                        <Select
                            defaultValue={'1'}
                            value="1"
                            onChange={() => {}}
                        >
                            <Select.Option value="1">
                                Descending Insertion date
                            </Select.Option>
                            <Select.Option value="2">
                                Ascending Price per month
                            </Select.Option>
                            <Select.Option value="3">
                                Asceding Space in square meter
                            </Select.Option>
                        </Select>
                    </Grid>
                </Grid.Container>
            </Card>
        </Grid>
    )
}
