import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import Property from '../../types/Property'

export const deleteRemovedEntries = async (
    listOfProperties: Property[][],
    client: SupabaseClient<Database>
) => {
    const currentProperties = await client.from('properties').select('*')
    const availableIds = listOfProperties.reduce<string[]>(
        (all, properties) => {
            return [...all, ...properties.map(({ id }) => id)]
        },
        []
    )

    const toBeDeleteProperties = currentProperties?.data?.filter(
        ({ id }) => !availableIds.includes(id)
    )

    return await Promise.all(
        toBeDeleteProperties?.map(async (property) =>
            client
                .from('properties')
                .update({ deleted: true })
                .eq('id', property.id)
        ) || []
    )
}

export const upsertNewProperties = async (
    listOfProperties: Property[][],
    client: SupabaseClient<Database>
) => {
    await Promise.all(
        listOfProperties.map(async (properties) =>
            Promise.all(
                properties.map(async ({ sqmeterPriceRatio, ...rest }) => {
                    const { error, data } = await client
                        .from('properties')
                        .upsert({ ...rest, deleted: false })

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
