import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import useFetch from 'use-http'
import { PropertyComponent } from '../components/PropertyComponent'
import Property from '../lib/Property'

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
        <Layout home>
            <Head>
                <title>Property Scouting - Berlin</title>
            </Head>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Avaiable Properties</h2>
                <ul className={utilStyles.list}>
                    {properties.map((property) => (
                        <PropertyComponent property={property} />
                    ))}
                </ul>
            </section>
        </Layout>
    )
}
