import { Grid, Modal, Page, Spacer, Spinner, Text } from '@geist-ui/core'
import Activity from '@geist-ui/icons/activity'
import { useContext } from 'react'
import { FilterBar } from '../components/filter/FilterBar'
import Layout from '../components/layout'
import { PropertyComponent } from '../components/property/PropertyComponent'
import { PropertyContext } from '../components/property/PropertyContext'

const Dashboard = () => {
    const { properties, errors, isLoading } = useContext(PropertyContext)

    if (isLoading) {
        return (
            <Page dotBackdrop>
                <Grid.Container
                    gap={2}
                    justify="center"
                    alignItems="center"
                    height="100vh"
                >
                    <Grid xs={24} data-testid="spinner" justify="center">
                        <Spinner scale={2} />
                    </Grid>
                </Grid.Container>
            </Page>
        )
    }

    if (properties.length === 0 && errors.length > 0) {
        return (
            <Page dotBackdrop>
                <Modal visible={true} onClose={() => window.location.reload()}>
                    <Modal.Title>
                        <Activity />
                        <Spacer inline /> Unable to get properties
                    </Modal.Title>
                    <Modal.Content>
                        <Text em data-testid="error-text">
                            We were unable to query data for the searched
                            properties. This is unexpected, please try later
                            again.
                        </Text>
                    </Modal.Content>
                    <Modal.Action onClick={() => window.location.reload()}>
                        Retry
                    </Modal.Action>
                </Modal>
            </Page>
        )
    }

    return (
        <Layout
            header={
                <FilterBar />
                /* TODO: Not yet functional <SubFilterView /> */
            }
        >
            <Grid.Container gap={2} justify="center">
                {properties.map((property) => (
                    <Grid xs={24} sm={12} md={6} key={property.id}>
                        <PropertyComponent property={property} />
                    </Grid>
                ))}
            </Grid.Container>
        </Layout>
    )
}

export default Dashboard
