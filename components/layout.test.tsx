import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Layout from './layout'

describe('layout', () => {
    beforeEach(() => {
        render(
            <Layout headerChildren={<p data-testid="header-children">test</p>}>
                <div data-testid="content">test2</div>
            </Layout>
        )
    })

    afterEach(() => {
        cleanup()
    })

    test('should render out name inside the header', function () {
        expect(screen.getByTestId('header-name').textContent).toBe('🏘️ Flatter')
    })

    test('should render header children', function () {
        expect(screen.getByTestId('header-children').textContent).toBe('test')
    })

    test('should render header children', function () {
        expect(screen.getByTestId('content').textContent).toBe('test2')
    })
})
