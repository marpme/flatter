import Property from '../lib/Property'
import utilStyles from '../styles/utils.module.css'

export const PropertyComponent: React.FC<{ property: Property }> = ({
    property,
}) => (
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
                {property.sqmeterPriceRatio} €/m² , {property.price} €/mo ,{' '}
                {property.sqmeter} m²
            </small>

            <small className={utilStyles.lightText}>{property.address}</small>
        </div>
    </li>
)
