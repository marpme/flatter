import {
    Card,
    Grid,
    Input,
    Text,
    Select,
    Checkbox,
    Description,
} from '@geist-ui/core'
import { Filter } from '@geist-ui/icons'
import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import {
    useFilterMutations,
    useFilterOptions,
} from '../property/usePropertyFilterStore'
import { PropertySortOption, propertySortValues } from '../../types/Property'

export const FilterBar: FC = () => {
    const { t } = useTranslation('common')
    const { filter, sort } = useFilterOptions()
    const { setMinPrice, setMaxPrice, setSorting, setWBSFilter } =
        useFilterMutations()

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
                                amount: '?',
                                maxAmount: '?',
                            })}
                        </Text>
                    </Grid>
                    <Grid xs={8} alignItems="center">
                        <Input
                            data-testid="price-min"
                            placeholder="200"
                            labelRight="€/mo"
                            scale={2 / 3}
                            value={String(filter.price.min)}
                            onChange={(e) => {
                                if (!isNaN(parseInt(e.target.value, 10))) {
                                    setMinPrice(parseInt(e.target.value, 10))
                                }
                            }}
                        />
                        <Text mx={0.5}>-</Text>
                        <Input
                            data-testid="price-max"
                            placeholder="1000"
                            labelRight="€/mo"
                            scale={2 / 3}
                            value={String(filter.price.max)}
                            onChange={(e) => {
                                if (!isNaN(parseInt(e.target.value, 10))) {
                                    setMaxPrice(parseInt(e.target.value, 10))
                                }
                            }}
                        />
                    </Grid>
                    <Grid xs={8} alignItems="center">
                        <Description
                            title={'One-Click Filters'}
                            content={
                                <Grid.Container>
                                    <Checkbox
                                        checked={filter.wbs}
                                        onClick={() => {
                                            setWBSFilter(!filter.wbs)
                                        }}
                                    >
                                        {t('Allow WBS')}
                                    </Checkbox>
                                </Grid.Container>
                            }
                        />
                    </Grid>
                    <Grid xs={8} justify="flex-end">
                        <Select
                            defaultValue={sort}
                            value={sort}
                            onChange={(selected) => {
                                setSorting(selected as PropertySortOption)
                            }}
                        >
                            {propertySortValues.map((sortValue) => (
                                <Select.Option
                                    value={sortValue}
                                    key={sortValue}
                                >
                                    {t(`sort.${sortValue}`)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Grid>
                </Grid.Container>
            </Card>
        </Grid>
    )
}
