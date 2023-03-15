import { Grid, Modal, Page, Spacer, Spinner, Text } from '@geist-ui/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Activity from '@geist-ui/icons/activity'
import { FilterBar } from '../components/filter/FilterBar'
import Layout from '../components/layout'
import { PropertyComponent } from '../components/property/PropertyComponent'
import { GetStaticProps } from 'next'
import { useQuery } from 'react-query'
import { loadProperties } from '../components/property/PropertyLoader'

export const getStaticProps: GetStaticProps<{}> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
})

const Dashboard = () => {
    const {
        error,
        data: properties,
        isLoading,
    } = useQuery('properties', loadProperties)

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

    if (!properties || error) {
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
}

export default Dashboard
