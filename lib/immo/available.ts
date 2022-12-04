import { getDegewoProperties } from './degewo'
import { getHowogeProperties } from './howoge'
import { getGesobauProperties } from './gesobau'
import { Organisation } from '../../types/Organisation'

export const providerToPropertyMap = new Map([
    [Organisation.DEGEWO, getDegewoProperties],
    [Organisation.HOWOGE, getHowogeProperties],
    [Organisation.GESOBAU, getGesobauProperties],
])
