import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import useFetch from 'use-http'
import { PropertyComponent } from '../components/PropertyComponent'
import Property from '../lib/Property'
import { Grid, Page } from '@geist-ui/core'

export default function Home() {
    const [properties, setProperties] = useState([])
    const { get, response, loading, error } = useFetch<Property[]>()

    useEffect(() => {
        async function initializeProperties() {
            const initialTodos = await get('/api/v1/properties')
            if (response.ok) setProperties(initialTodos)
        }
        initializeProperties()
    }, []) // componentDidMount

    return (
        <Page dotBackdrop>
            <Layout home>
                <Head>
                    <title>Property Scouting - Berlin</title>
                </Head>
                <section>
                    <h2>Avaiable Properties</h2>
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
