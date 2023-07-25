import { NextApiRequest, NextApiResponse } from 'next'
import {
    PropertyFilterOption,
    PropertySortOption,
} from '../../../../types/Property'
import { prisma } from '../../../../lib/PrimsaClient'

type PropertiesHandler = {
    sort: PropertySortOption
    filter: PropertyFilterOption
}

const parseQuery = (req: NextApiRequest): PropertiesHandler => {
    const { priceMax, priceMin, wbs, sort } = req.query

    return {
        sort: sort as PropertySortOption,
        filter: {
            price: {
                min: parseInt(String(priceMin), 10),
                max: parseInt(String(priceMax), 10),
            },
            wbs: Boolean(wbs),
        },
    }
}

const propertiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res
            .status(400)
            .setHeader('Cache-Control', 'public, max-age=300')
            .json({})
    }

    const { filter, sort } = parseQuery(req)

    const properties = await prisma.property.findMany({
        where: {
            deleted: false,
            price: {
                gte: filter.price.min,
                lte: filter.price.max,
            },
            // if wbs is chosen, show both if not only non-wbs
            ...(filter.wbs ? {} : { wbs: false }),
        },
        orderBy: {
            ...(sort === 'inserted' ? { createdAt: 'desc' } : {}),
            ...(sort === 'price' ? { price: 'asc' } : {}),
            ...(sort === 'sqmeter' ? { createdAt: 'asc' } : {}),
        },
    })

    if (!properties) {
        return res.status(500).json({ message: 'error loading properties' })
    }

    const sortFunction = sortFunctions[sort]
    const sortedProperties = (properties as Property[]).sort(sortFunction)

    return res
        .status(200)
        .setHeader('Cache-Control', 'public, max-age=300')
        .json(properties ?? [])
}

export default propertiesHandler
