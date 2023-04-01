import { describe, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { Organisation } from '../../types/Organisation'
import Property from '../../types/Property'

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

const propertiesMock: Property[] = [
    {
        id: `id123`,
        created_at: '2023-01-24 18:37:44.765102+00',
        org: Organisation.DEGEWO,
        address: 'some address 123',
        price: 123.45,
        sqmeter: 90,
        headline: 'the beautiful property',
        thumbnail: 'https://abc.com/abc',
        imageLinks: ['https://abc.com/abcimage'],
        propertyLink: 'https://abc.com/property',
        wbs: true,
        roomCount: 3,
    },
    {
        id: `id234`,
        created_at: '2023-01-24 18:37:44.765102+00',
        org: Organisation.DEGEWO,
        address: 'some address 234',
        price: 900.0,
        sqmeter: 90,
        headline: 'the beautiful property',
        thumbnail: 'https://abc.com/abc',
        imageLinks: ['https://abc.com/abcimage'],
        propertyLink: 'https://abc.com/property',
        wbs: false,
        roomCount: 2,
    },
]

describe.skip('Dashboard', () => {
    afterEach(() => {
        cleanup()
    })

    /*it('should render statistics the header', function () {
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
        expect(content).toBe('filter')
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
    })*/
})
