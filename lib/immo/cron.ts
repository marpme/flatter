import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import Property from '../Property'

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
    results: Array<PromiseSettledResult<Property[]>>,
    client: SupabaseClient<Database>
) => {
    await Promise.all(
        results.map(async (result) => {
            if (result.status === 'fulfilled') {
                return Promise.all(
                    result.value.map(
                        async ({ id, sqmeterPriceRatio, ...rest }) => {
                            const { error, data } = await client
                                .from('properties')
                                .insert(rest)

                            return Promise.resolve({
                                error,
                                data,
                            })
                        }
                    )
                )
            }

            return Promise.resolve()
        })
    )
}
