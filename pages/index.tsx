import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { ComposedPropertyView } from '../views/PropertyList'

export const getStaticProps: GetStaticProps<{}> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
})

const PropertyIndexPage = () => <ComposedPropertyView />

export default PropertyIndexPage
