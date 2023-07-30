import type { Property as DBProperty } from '@prisma/client'

type Property = DBProperty
export default Property

export type CreationProperty = Omit<
  Property,
  'deleted' | 'createdAt' | 'updatedAt'
>

export type PropertyFilterOption = {
  price: {
    min: number
    max: number
  }
  /* TODO: Enable filters later
    roomCount: {
        min: number
    }
    sqmeter: {
        min: number
    }*/
  wbs: boolean
}

export const propertySortValues = ['inserted', 'price', 'sqmeter'] as const
export type PropertySortOption = (typeof propertySortValues)[number]
