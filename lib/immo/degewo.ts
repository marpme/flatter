import { DegewoSearchResult } from '../../types/DegewoSearchResponse'
import { Organisation } from '../../types/Organisation'
import Property from '../../types/Property'

const PAGE_INDEX_REGEX = /\/de\/search\.json\?page=(\d+)/

export const getDegewoProperties = async (): Promise<Property[]> => {
    const response = await fetch(`https://immosuche.degewo.de/de/search.json`)
    const { immos, pagination } = (await response.json()) as DegewoSearchResult

    const numberOfSites =
        parseInt(pagination.last_page.match(PAGE_INDEX_REGEX)![1], 10) || 0

    for (let i = 2; i <= Math.min(numberOfSites, 10); i++) {
        console.log('updating pages:', i, 'of', Math.min(numberOfSites, 10))
        let pageResponse = await fetch(
            `https://immosuche.degewo.de/de/search.json?page=${i}`
        )
        const { immos: additionalImmos } =
            (await pageResponse.json()) as DegewoSearchResult

        immos.push(...additionalImmos)
    }

    return immos.map((property: any) => ({
        id: `${Organisation.DEGEWO}/${property.id}`,
        org: Organisation.DEGEWO,
        address: property.address,
        price: property.rent_total_with_vat
            .replace(' €', '')
            .replace('.', '')
            .replace(',', '.'),
        sqmeter: property.living_space,
        sqmeterPriceRatio:
            parseFloat(
                property.rent_total_with_vat
                    .replace(' €', '')
                    .replace('.', '')
                    .replace(',', '.')
            ) / Number(property.living_space),
        headline: property.headline,
        thumbnail: property.thumb_path,
        imageLinks: property.external_data.map(
            ({ filename }: any) =>
                `https://immosuche.degewo.de/images/properties/full/760x570/${filename}`
        ),
        propertyLink: `https://immosuche.degewo.de${property.property_path}`,
    }))
}
