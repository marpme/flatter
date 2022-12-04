import { getDegewoProperties } from './degewo'
import { getHowogeProperties } from './howoge'
import { getGesobauProperties } from './gesobau'
import { Organisation } from '../../types/Organisation'
import Property from '../../types/Property'

export type PropertyFetcher = () => Promise<Property[]>

export const providerToPropertyMap = new Map<Organisation, PropertyFetcher>([
    [Organisation.DEGEWO, getDegewoProperties],
    [Organisation.HOWOGE, getHowogeProperties],
    [Organisation.GESOBAU, getGesobauProperties],
])
