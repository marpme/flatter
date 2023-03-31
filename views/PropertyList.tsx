import { useQuery } from '@tanstack/react-query'
import { loadProperties } from '../components/property/PropertyLoader'
import { Grid } from '@geist-ui/core'
import Layout from '../components/layout'
import { FilterBar } from '../components/filter/FilterBar'
import { PropertyComponent } from '../components/property/PropertyComponent'
import { LoadingView } from './Loading'
import { ErrorView } from './ErrorView'
import Property from '../types/Property'

export const PropertyList: React.FC<{ properties: Property[] }> = ({
    properties,
}) => (
    <Layout
        header={
            <Grid.Container>
                <FilterBar />
            </Grid.Container>
        }
    >
        <Grid.Container gap={2} justify="center">
            {properties.map((property) => (
                <Grid xs={24} sm={12} md={6} key={property.id}>
                    <PropertyComponent property={property as any} />
                </Grid>
            ))}
        </Grid.Container>
    </Layout>
)

export const ComposedPropertyView = () => {
    const {
        error,
        data: properties,
        isLoading,
    } = useQuery(['properties'], loadProperties)

    if (isLoading) {
        return <LoadingView />
    }

    if (!properties || error) {
        return <ErrorView />
    }

    return <PropertyList properties={properties} />
}
