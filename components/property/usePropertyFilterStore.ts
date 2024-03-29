import { create } from 'zustand'
import { PropertyFilterOption, PropertySortOption } from '../../types/Property'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { over, lensPath } from 'ramda'

export type PropertyFiltersState = {
  filter: PropertyFilterOption
  sort: PropertySortOption
}

export type PropertyFilterAction = {
  setMinPrice: (price: number) => void
  setMaxPrice: (price: number) => void
  setSorting: (sort: PropertySortOption) => void
  setWBSFilter: (wbs: boolean) => void
}

const initialFilterState: PropertyFiltersState = {
  filter: {
    price: {
      min: 0,
      max: 1500,
    },
    /* TODO: Enable filters later
        roomCount: {
            min: 1,
        },
        sqmeter: {
            min: 10,
        },*/
    wbs: true,
  },
  sort: 'inserted',
}

const usePropertyFilterStore = create<
  PropertyFiltersState & PropertyFilterAction
>()(
  devtools(
    persist(
      (set) => ({
        ...initialFilterState,
        setMaxPrice: (price: number) =>
          set(over(lensPath(['filter', 'price', 'max']), () => price)),
        setMinPrice: (price: number) =>
          set(over(lensPath(['filter', 'price', 'min']), () => price)),
        setSorting: (sort: PropertySortOption) =>
          set(over(lensPath(['sort']), () => sort)),
        setWBSFilter: (wbs: boolean) =>
          set(over(lensPath(['filter', 'wbs']), () => wbs)),
      }),
      {
        name: 'property-filter-store-f597ba8',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)

export const useFilterOptions = () =>
  usePropertyFilterStore(
    (state) => ({
      filter: state.filter,
      sort: state.sort,
    }),
    shallow
  )

export const useFilterMutations = () =>
  usePropertyFilterStore((state) => ({
    setMaxPrice: state.setMaxPrice,
    setMinPrice: state.setMinPrice,

    setSorting: state.setSorting,
    setWBSFilter: state.setWBSFilter,
  }))
