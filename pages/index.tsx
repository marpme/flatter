import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { GetServerSideProps, GetStaticProps } from 'next'
import { getDegewoProperties } from '../lib/immo/degewo'
import Property from '../lib/Property'
import { getHowogeProperties } from '../lib/immo/howoge'

export default function Home({ properties }: { properties: Property[] }) {
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
                        <li className={utilStyles.listItem} key={property.id}>
                            <a
                                href={property.propertyLink}
                                rel="noopener noreferrer"
                                target="_blank"
                                className={utilStyles.listThumbnail}
                            >
                                <img src={property.imageLinks[0]} />
                            </a>
                            <div className={utilStyles.listData}>
                                <a
                                    className={utilStyles.listDataItem}
                                    href={property.propertyLink}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {property.headline}
                                </a>

                                <small className={utilStyles.pricing}>
                                    {property.sqmeterPriceRatio} €/m² ,{' '}
                                    {property.price} €/mo , {property.sqmeter}{' '}
                                    m²
                                </small>

                                <small className={utilStyles.lightText}>
                                    {property.address}
                                </small>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader('Cache-Control', 'public, max-age=300')
    console.log('Computing properties ...')

    const properties = [
        ...(await getDegewoProperties()),
        ...(await getHowogeProperties()),
    ].sort(
        (propertyA, propertyB) =>
            propertyA.sqmeterPriceRatio - propertyB.sqmeterPriceRatio
    )
    return {
        props: {
            properties,
        },
    }
}
