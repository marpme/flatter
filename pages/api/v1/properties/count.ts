import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'

const propertiesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    const { count, error } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

    if (error) {
        return res.status(500).json({ message: 'error loading properties' })
    }

    res.setHeader('Cache-Control', 'public, max-age=300')

    return res.status(200).json(count)
}

export default propertiesHandler
