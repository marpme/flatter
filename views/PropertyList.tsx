import { Button, Grid } from '@geist-ui/core'
import Layout from '../components/layout'
import { FilterBar } from '../components/filter/FilterBar'
import { PropertyComponent } from '../components/property/PropertyComponent'
import Property from '../types/Property'
import { useProperties } from '../components/property/useProperties'
import { useFilterOptions } from '../components/property/usePropertyFilterStore'
import PropertySkeleton from '../components/property/PropertySkeleton'
import { FC, ReactElement } from 'react'

export const PropertyList = ({
  properties,
  isLoading,
}: {
  properties?: Property[]
  isLoading: boolean
}): ReactElement[] => {
  if (!properties || isLoading) {
    return Array<JSX.Element>(25).map((_, index) => (
      <PropertySkeleton key={`property-skeleton-${index}`} />
    ))
  }

  return properties.map((property) => (
    <Grid xs={24} sm={12} md={6} key={property.id}>
      <PropertyComponent property={property} />
    </Grid>
  ))
}

export const ComposedPropertyView: FC = () => {
  const { filter, sort } = useFilterOptions()
  const { data: properties, isLoading } = useProperties(sort, filter)

  return (
    <Layout
      header={
        <Grid.Container>
          <FilterBar />
        </Grid.Container>
      }
    >
      <Grid.Container gap={2} justify="center">
        {...PropertyList({
          properties,
          isLoading,
        })}
      </Grid.Container>
    </Layout>
  )
}
