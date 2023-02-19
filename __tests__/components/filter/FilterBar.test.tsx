import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { FilterBar } from '../../../components/filter/FilterBar'
import { Organisation } from '../../../types/Organisation'

vi.mock('@supabase/auth-helpers-react', () => ({
    useSupabaseClient: () => ({
        from: () => ({
            select: () => ({
                gt: () => ({
                    lt: () => ({
                        data: [],
                    }),
                }),
            }),
        }),
    }),
}))

describe.skip('FilterBar', () => {
    /*beforeEach(() => {
        render(
            <PropertyContext.Provider
                value={
                    {
                        properties: [
                            {
                                id: `id123`,
                                org: Organisation.DEGEWO,
                                address: 'some address 123',
                                price: 123.45,
                                sqmeter: 90,
                                sqmeterPriceRatio:
                                    parseFloat('900') / Number('90'),
                                headline: 'the beautiful property',
                                thumbnail: 'https://abc.com/abc',
                                imageLinks: ['https://abc.com/abcimage'],
                                propertyLink: 'https://abc.com/property',
                            },
                            {
                                id: `id123`,
                                org: Organisation.DEGEWO,
                                address: 'some address 123',
                                price: 900.0,
                                sqmeter: 90,
                                sqmeterPriceRatio:
                                    parseFloat('900') / Number('90'),
                                headline: 'the beautiful property',
                                thumbnail: 'https://abc.com/abc',
                                imageLinks: ['https://abc.com/abcimage'],
                                propertyLink: 'https://abc.com/property',
                            },
                        ],
                        errors: [],
                        isLoading: false,
                        replaceProperties: () => {},
                    } as any
                }
            >
                <FilterBar />
            </PropertyContext.Provider>
        )
    })*/

    afterEach(() => {
        cleanup()
    })

    it('should render statistics the header', function () {
        const content = screen.getByTestId('filter-header').textContent
        expect(content).toBe('filter')
    })

    it('should allow min and max price adjustments', function () {
        const minValue = screen.getByTestId<HTMLInputElement>('price-min').value
        const maxValue = screen.getByTestId<HTMLInputElement>('price-max').value

        expect(minValue).toBe('123')
        expect(maxValue).toBe('900')
    })

    it('should have a quick-switch buttons', () => {
        const buttonGroup = screen.getByTestId('quick-buttons')
        expect(buttonGroup).toBeInTheDocument()
    })
})
