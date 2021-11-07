import { imageifyLink } from '../imageify'
import Property from '../Property'

export const getHowogeProperties = async (): Promise<Property[]> => {
    return fetch(
        'https://www.howoge.de/?type=999&tx_howsite_json_list[action]=immoList',
        {
            body: createSearchParam().toString(),
            method: 'POST',
        }
    )
        .then((response) => response.ok && response.json())
        .then(({ immoobjects: properties }) => {
            return properties.map((property) => ({
                id: property.uid,
                address: property.title,
                price: property.rent,
                sqmeter: property.area,
                sqmeterPriceRatio: (
                    parseFloat(property.rent) / Number(property.area)
                ).toFixed(2),
                headline: property.notice + ' - ' + property.title,
                thumnail: imageifyLink(property.image),
                imageLinks: [
                    imageifyLink(`https://www.howoge.de${property.image}`),
                ],
                propertyLink: `https://www.howoge.de${property.link}`,
            }))
        })
}

const createSearchParam = (roomCount: string = '3', page: string = '1') => {
    const searchParams = new URLSearchParams()

    searchParams.append('tx_howsite_json_list[page]', page)
    searchParams.append('tx_howsite_json_list[limit]', '12')
    searchParams.append('tx_howsite_json_list[rooms]', roomCount)
    searchParams.append('tx_howsite_json_list[wbs]', 'all-offers')

    return searchParams
}
