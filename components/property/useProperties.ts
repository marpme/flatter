import { PropertyFilterOption, PropertySortOption } from '../../types/Property'
import { loadProperties } from './PropertyLoader'
import { useQuery } from '@tanstack/react-query'

export const useProperties = (
  sort: PropertySortOption,
  filter: PropertyFilterOption
) =>
  useQuery({
    queryKey: ['properties', sort, filter],
    queryFn: loadProperties(sort, filter),
  })
