import { useEffect, useMemo, useState } from 'react'
import * as dateLocales from 'date-fns/locale'
import { i18n } from 'next-i18next'

export const useLocale = () => {
    const [locale, setLocale] = useState('en')

    useEffect(() => {
        setLocale(i18n?.language ?? 'en')
    }, [])

    const dateLocale = useMemo(() => {
        const pickedDateLocaleEntry = Object.entries(dateLocales).find(
            ([key]) => {
                const locationToScout = new RegExp(key)
                return locationToScout.test(locale)
            }
        )

        if (pickedDateLocaleEntry) {
            return pickedDateLocaleEntry[1]
        }

        return dateLocales.enUS
    }, [locale])

    return { locale, dateLocale }
}
