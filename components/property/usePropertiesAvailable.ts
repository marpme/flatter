import { useQuery } from '@tanstack/react-query'
import { loadAvailablePropertyCount } from './PropertyLoader'

export const useAvailablePropertyCount = () =>
    useQuery({
        queryKey: ['availalbe-property-count'],
        queryFn: loadAvailablePropertyCount,
    })
