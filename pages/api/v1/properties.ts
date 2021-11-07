import { getDegewoProperties } from '../../../lib/immo/degewo'
import { getHowogeProperties } from '../../../lib/immo/howoge'

export default async (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300')
    console.log('Computing properties ...')

    const properties = [
        ...(await getDegewoProperties()),
        ...(await getHowogeProperties()),
    ].sort(
        (propertyA, propertyB) =>
            propertyA.sqmeterPriceRatio - propertyB.sqmeterPriceRatio
    )
    res.json(properties)
}
