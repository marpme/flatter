import { getDegewoProperties } from './degewo'
import { getHowogeProperties } from './howoge'
import { getGesobauProperties } from './gesobau'
import { Organisation } from '../../types/Organisation'
import { CreationProperty } from '../../types/Property'

export type PropertyFetcher = () => Promise<CreationProperty[]>

export const providerToPropertyMap = new Map<Organisation, PropertyFetcher>([
  [Organisation.DEGEWO, getDegewoProperties],
  [Organisation.HOWOGE, getHowogeProperties],
  [Organisation.GESOBAU, getGesobauProperties],
])
