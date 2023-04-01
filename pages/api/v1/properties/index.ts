import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'
import Property, {
    PropertyFilterOption,
    PropertySortOption,
} from '../../../../types/Property'

type PropertiesHandler = {
    sort: PropertySortOption
    filter: PropertyFilterOption
}

const sortFunctions: {
    [key in PropertySortOption]: (
        propertyA: Property,
        propertyB: Property
    ) => number
} = {
    inserted: (propertyA, propertyB) =>
        new Date(propertyA.created_at!).getTime() -
        new Date(propertyB.created_at!).getTime(),
    price: (propertyA, propertyB) => propertyA.price - propertyB.price,
    sqmeter: (propertyA, propertyB) => propertyB.sqmeter - propertyA.sqmeter,
}

const propertiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { filter, sort } = req.body as PropertiesHandler
    const supabase = createServerSupabaseClient<Database>({ req, res })

    const propertyLoader = supabase
        .from('properties')
        .select('*')
        .eq('deleted', 'false')
        .gte('price', filter.price.min)
        .lte('price', filter.price.max)

    // if wbs is disabled, just load non-wbs properties
    // otherwise, we just load all!
    if (!filter.wbs) {
        propertyLoader.eq('wbs', false)
    }

    const { data: properties, error } = await propertyLoader
    if (error || !properties) {
        return res.status(500).json({ message: 'error loading properties' })
    }

    res.setHeader('Cache-Control', 'public, max-age=300')

    const sortFunction = sortFunctions[sort]
    const sortedProperties = (properties as Property[]).sort(sortFunction)

    return res.status(200).json(sortedProperties)
}

export default propertiesHandler
