import { imageifyLink } from '../imageify'
import Property from '../Property'
import { Organisation } from "./Organisation"

export const getDegewoProperties = async (): Promise<Property[]> => {
    return fetch(
        `https://immosuche.degewo.de/de/search.json?${createSearchParam().toString()}`
    )
        .then((response) => response.ok && response.json())
        .then(({ immos: properties }) => {
            return properties.map((property) => ({
                id: `${Organisation.DEGEWO}/${property.id}`,
                org: Organisation.DEGEWO,
                address: property.address,
                price: property.rent_total_with_vat
                    .replace(' €', '')
                    .replace('.', '')
                    .replace(',', '.'),
                sqmeter: property.living_space,
                sqmeterPriceRatio: (
                    parseFloat(
                        property.rent_total_with_vat
                            .replace(' €', '')
                            .replace('.', '')
                            .replace(',', '.')
                    ) / Number(property.living_space)
                ).toFixed(2),
                headline: property.headline,
                thumnail: imageifyLink(property.thumb_path),
                imageLinks: property.external_data.map(({ filename }) =>
                    imageifyLink(
                        `https://immosuche.degewo.de/images/properties/full/760x570/${filename}`
                    )
                ),
                propertyLink: `https://immosuche.degewo.de${property.property_path}`,
            }))
        })
}

const createSearchParam = (roomCount: string = '3', page: string = '1') => {
    const searchParams = new URLSearchParams()

    // utf8=%E2%9C%93&property_type_id=1&categories%5B%5D=1&property_number=&address%5Braw%5D=&address%5Bstreet%5D=&address%5Bcity%5D=&address%5Bzipcode%5D=&address%5Bdistrict%5D=&district=&price_switch=false&price_switch=on&price_from=&price_to=&price_from=&price_to=&price_radio=null&price_from=&price_to=&qm_radio=null&qm_from=&qm_to=&rooms_radio=3&rooms_from=&rooms_to=&features%5B%5D=&wbs_required=&order=rent_total_without_vat_asc&
    searchParams.append('property_type_id', '1')
    searchParams.append('categories[]', '1')
    searchParams.append('price_switch', 'false')
    searchParams.append('price_switch', 'on')
    searchParams.append('qm_radio', 'null')
    searchParams.append('rooms_radio', roomCount)
    searchParams.append('wbs_required', 'false')
    searchParams.append('order', 'rent_total_without_vat_asc')
    searchParams.append('price_radio', 'null')
    searchParams.append('page', page)

    return searchParams
}
