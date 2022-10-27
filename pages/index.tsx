import {
    Button,
    ButtonGroup,
    Grid,
    Modal,
    Page,
    Select,
    Spacer,
    Spinner,
    Text,
} from '@geist-ui/core'
import { Map } from '@geist-ui/icons'
import Activity from '@geist-ui/icons/activity'
import AlignJustify from '@geist-ui/icons/alignJustify'
import Head from 'next/head'
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
                    <Grid xs={24} justify="center">
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

    return (
        <Page dotBackdrop>
            <Layout>
                <Head>
                    <title>Property Scouting - Berlin</title>
                </Head>
                <section>
                    <Grid.Container gap={2} justify="center" height="100px">
                        <Grid xs={24}>
                            <FilterBar />
                        </Grid>
                        <Grid xs={12}>
                            <Button
                                type="secondary"
                                icon={<AlignJustify />}
                                style={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                }}
                            >
                                List
                            </Button>
                            <Button
                                icon={<Map />}
                                style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                            >
                                Map
                            </Button>
                        </Grid>
                        <Grid xs={8}></Grid>
                        <Grid xs={4}>
                            <Grid.Container>
                                <Grid xs={24} justify="flex-end">
                                    <Text small em>Sort by ...</Text>
                                </Grid>
                                <Grid xs={24} justify="flex-end">
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
                        </Grid>
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
