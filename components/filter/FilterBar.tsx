import {
    Card,
    Grid,
    Input,
    Text,
    Select,
    Checkbox,
    Description,
    useMediaQuery,
    Fieldset,
    useTheme,
} from '@geist-ui/core'
import Filter from '@geist-ui/icons/filter'
import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import {
    useFilterMutations,
    useFilterOptions,
} from '../property/usePropertyFilterStore'
import { PropertySortOption, propertySortValues } from '../../types/Property'
import { useProperties } from '../property/useProperties'
import { useAvailablePropertyCount } from '../property/usePropertiesAvailable'

export const FilterBar: FC = () => {
    const { t } = useTranslation('common')
    const theme = useTheme()
    const isSMOrSmaller = useMediaQuery('sm', {
        match: 'down',
    })

    const { filter, sort } = useFilterOptions()
    const { setMinPrice, setMaxPrice, setSorting, setWBSFilter } =
        useFilterMutations()

    const { data: propertiesMeta } = useAvailablePropertyCount()
    const { data: properties } = useProperties(sort, filter)

    if (isSMOrSmaller) {
        return (
            <Fieldset width={100}>
                <Fieldset.Subtitle>
                    <Grid.Container>
                        <Grid xs={24}>
                            <Text
                                span
                                style={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.accents_5,
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    lineHeight: '1em',
                                }}
                            >
                                {t('filterBar.priceFilter')}
                            </Text>
                        </Grid>
                        <Grid xs={10} alignItems={'center'} justify={'center'}>
                            <Input
                                data-testid="price-min"
                                placeholder="200"
                                labelRight="€/mo"
                                scale={2 / 3}
                                value={String(filter.price.min)}
                                onChange={(e) => {
                                    if (!isNaN(parseInt(e.target.value, 10))) {
                                        setMinPrice(
                                            parseInt(e.target.value, 10)
                                        )
                                    }
                                }}
                            />
                        </Grid>
                        <Grid xs={4} alignItems={'center'} justify={'center'}>
                            <Text mx={0.5}>-</Text>
                        </Grid>
                        <Grid xs={10} alignItems={'center'} justify={'center'}>
                            <Input
                                data-testid="price-max"
                                placeholder="1000"
                                labelRight="€/mo"
                                scale={2 / 3}
                                value={String(filter.price.max)}
                                onChange={(e) => {
                                    if (!isNaN(parseInt(e.target.value, 10))) {
                                        setMaxPrice(
                                            parseInt(e.target.value, 10)
                                        )
                                    }
                                }}
                            />
                        </Grid>
                    </Grid.Container>
                </Fieldset.Subtitle>
                <Fieldset.Subtitle>
                    <Grid.Container gap={1}>
                        <Grid xs={24}>
                            <Text
                                span
                                style={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.accents_5,
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    lineHeight: '1em',
                                }}
                            >
                                {t('filterBar.oneClickFilter')}
                            </Text>
                        </Grid>
                        <Grid xs={24}>
                            <Checkbox
                                checked={filter.wbs}
                                onClick={() => {
                                    setWBSFilter(!filter.wbs)
                                }}
                            >
                                {t('filterBar.wbs')}
                            </Checkbox>
                        </Grid>
                    </Grid.Container>
                </Fieldset.Subtitle>
                <Fieldset.Subtitle>
                    <Grid.Container gap={1}>
                        <Grid xs={24}>
                            <Text
                                span
                                style={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.accents_5,
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    lineHeight: '1em',
                                }}
                            >
                                {t('filterBar.sortOption')}
                            </Text>
                        </Grid>
                        <Grid xs={24}>
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
                </Fieldset.Subtitle>
            </Fieldset>
        )
    }

    return (
        <Grid xs={24}>
            <Card paddingBottom={0} width={'100%'}>
                <Grid.Container alignItems="center">
                    <Grid md={24} justify="flex-start" alignItems="center">
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
                                amount: properties?.length ?? '...',
                                maxAmount:
                                    propertiesMeta?.availableCount ?? '...',
                            })}
                        </Text>
                    </Grid>
                    <Grid
                        xs={24}
                        md={8}
                        justify="flex-start"
                        alignItems="center"
                    >
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
                    <Grid xs={24} md={8} justify="center" alignItems="center">
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
                    <Grid xs={24} md={8} justify="center">
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
