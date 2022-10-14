import { Grid, Modal, Page, Spacer, Spinner, Text } from '@geist-ui/core'
import Activity from '@geist-ui/icons/activity'
import Head from 'next/head'
import useSWR from 'swr'
import Layout from '../components/layout'
import { PropertyComponent } from '../components/PropertyComponent'
import { fetcher } from '../lib/fetcher'
import Property from '../lib/Property'

const Dashboard = () => {
    const {
        data: properties,
        isValidating,
        error,
    } = useSWR<Property[]>('/api/v1/properties', fetcher)

    if (error) {
        return (
            <Page dotBackdrop>
                <Modal visible={true} onClose={() => window.location.reload()}>
                    <Modal.Title>
                        <Activity />
                        <Spacer inline /> Unable to get properties
                    </Modal.Title>
                    <Modal.Content>
                        <Text em>
                            We were unable to query data for the searched
                            properties. This is expected, please try later
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

    if (isValidating || !properties) {
        return (
            <Page dotBackdrop>
                <Grid.Container
                    gap={2}
                    justify="center"
                    alignItems="center"
                    height="100vh"
                >
                    <Grid xs={24} justify="center">
                        <Spinner scale={2} />
                    </Grid>
                </Grid.Container>
            </Page>
        )
    }

    return (
        <Page dotBackdrop>
            <Layout home>
                <Head>
                    <title>Property Scouting - Berlin</title>
                </Head>
                <section>
                    <h2>Available Properties</h2>
                    <Grid.Container gap={2} justify="center" height="100px">
                        {properties.map((property) => (
                            <Grid xs={24} md={6} key={property.id}>
                                <PropertyComponent property={property} />
                            </Grid>
                        ))}
                    </Grid.Container>
                </section>
            </Layout>
        </Page>
    )
}

export default Dashboard
