import { getDegewoProperties } from './degewo'
import { getHowogeProperties } from './howoge'

export enum SupportedProviders {
    DEGEWO = 'degewo',
    HOWOGE = 'howoge',
}

export const providerToPropertyMap = {
    [SupportedProviders.DEGEWO]: getDegewoProperties,
    [SupportedProviders.HOWOGE]: getHowogeProperties,
}
