import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { PropertyContext } from '../components/property/PropertyContext'
import Dashboard from '../pages/index'
import { Organisation } from '../lib/Organisation'

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
const propertiesMock = [
    {
        id: `id123`,
        org: Organisation.DEGEWO,
        address: 'some address 123',
        price: 123.45,
        sqmeter: 90,
        sqmeterPriceRatio: parseFloat('900') / Number('90'),
        headline: 'the beautiful property',
        thumbnail: 'https://abc.com/abc',
        imageLinks: ['https://abc.com/abcimage'],
        propertyLink: 'https://abc.com/property',
    },
    {
        id: `id234`,
        org: Organisation.DEGEWO,
        address: 'some address 234',
        price: 900.0,
        sqmeter: 90,
        sqmeterPriceRatio: parseFloat('900') / Number('90'),
        headline: 'the beautiful property',
        thumbnail: 'https://abc.com/abc',
        imageLinks: ['https://abc.com/abcimage'],
        propertyLink: 'https://abc.com/property',
    },
]

describe('Dashboard', () => {
    afterEach(() => {
        cleanup()
    })

    it('should render statistics the header', function () {
        render(
            <PropertyContext.Provider
                value={
                    {
                        properties: propertiesMock,
                        errors: [],
                        isLoading: false,
                        replaceProperties: () => {},
                    } as any
                }
            >
                <Dashboard />
            </PropertyContext.Provider>
        )
        const content = screen.getByTestId('filter-header').textContent
        expect(content).toBe('Filters (2 out of 2)')
    })

    it('should have two properties shown on the dashboard', () => {
        render(
            <PropertyContext.Provider
                value={
                    {
                        properties: propertiesMock,
                        errors: [],
                        isLoading: false,
                        replaceProperties: () => {},
                    } as any
                }
            >
                <Dashboard />
            </PropertyContext.Provider>
        )
        const properties = screen.getAllByTestId('property-component')
        expect(properties).toHaveLength(2)
    })

    it('should show spinner on loading', () => {
        render(
            <PropertyContext.Provider
                value={
                    {
                        properties: [],
                        errors: [],
                        isLoading: true,
                        replaceProperties: () => {},
                    } as any
                }
            >
                <Dashboard />
            </PropertyContext.Provider>
        )

        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
    })

    it('should show error if loading failed', () => {
        render(
            <PropertyContext.Provider
                value={
                    {
                        properties: [],
                        errors: [new Error('could not load data')],
                        isLoading: false,
                        replaceProperties: () => {},
                    } as any
                }
            >
                <Dashboard />
            </PropertyContext.Provider>
        )

        const errorText = screen.getByTestId('error-text')
        expect(errorText).toBeInTheDocument()
        expect(errorText.textContent).toBe(
            'We were unable to query data for the searched properties. This is unexpected, please try later again.'
        )
    })
})
