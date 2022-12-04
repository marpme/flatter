import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import Property from '../../types/Property'

export const deletePreviousEntries = async (
    client: SupabaseClient<Database>
) => {
    const currentProperties = await client.from('properties').select('*')
    await Promise.all(
        currentProperties?.data?.map(async (property) =>
            client.from('properties').delete().eq('id', property.id)
        ) || []
    )
}

export const insertNewProperties = async (
    listOfProperties: Property[][],
    client: SupabaseClient<Database>
) => {
    await Promise.all(
        listOfProperties.map(async (properties) =>
            Promise.all(
                properties.map(async ({ id, sqmeterPriceRatio, ...rest }) => {
                    const { error, data } = await client
                        .from('properties')
                        .insert(rest)

                    return Promise.resolve({
                        error,
                        data,
                    })
                })
            )
        )
    )

    return listOfProperties
}
