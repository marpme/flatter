import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

export const getStaticProps: GetStaticProps<{}> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
})

const DynamicComposedPropertyView = dynamic(
    async () => {
        const { ComposedPropertyView } = await import('../views/PropertyList')
        return ComposedPropertyView
    },
    {
        ssr: false,
    }
)

const PropertyIndexPage = () => <DynamicComposedPropertyView />

export default PropertyIndexPage
