import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Layout from '../../components/layout'

describe('layout', () => {
    beforeEach(() => {
        render(
            <Layout header={<p data-testid="header-children">test</p>}>
                <div data-testid="content">test2</div>
            </Layout>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('should render out name inside the header', function () {
        expect(screen.getByTestId('header-name').textContent).toBe('🏘️ Flatter')
    })

    it('should render header children', function () {
        expect(screen.getByTestId('header-children').textContent).toBe('test')
    })

    it('should render children', function () {
        expect(screen.getByTestId('content').textContent).toBe('test2')
    })
})
