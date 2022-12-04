import { describe, expect, it } from 'vitest'
import { providerToPropertyMap } from '../../../lib/immo/available'
import { Organisation } from '../../../types/Organisation'

describe('available property provider', () => {
    it('should support all property providers', function() {
        const knowPropertyProviders = Object.values(Organisation)
        expect(providerToPropertyMap.size).toBe(knowPropertyProviders.length)
    })

    it('should have a function per provider to load their properties', function() {
        const knowPropertyProviders = Object.values(Organisation)

        for (let knowPropertyProvider of knowPropertyProviders) {
            expect(providerToPropertyMap.get(knowPropertyProvider as Organisation)).instanceof(Function)
        }
    })
})