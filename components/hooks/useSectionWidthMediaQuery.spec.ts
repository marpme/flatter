import { renderHook } from '@testing-library/react'
import { useSectionWidthMediaQuery } from './useSectionWidthMediaQuery'
import { describe, it, vi, beforeEach, Mock } from 'vitest'
import { useMediaQuery } from '@geist-ui/core'

describe('useSectionWidthMediaQuery', () => {
  let mockUseMediaQuery = useMediaQuery as Mock<
    Parameters<typeof useMediaQuery>,
    ReturnType<typeof useMediaQuery>
  >

  beforeEach(() => {
    vi.mock('@geist-ui/core', () => ({ useMediaQuery: vi.fn() }))
  })
  it('should be undefined if large enough screen is present', () => {
    mockUseMediaQuery.mockImplementation(() => false)
    const { result } = renderHook(() => useSectionWidthMediaQuery())
    expect(result.current).toEqual(undefined)
  })

  it('should default to 100 of the viewport width', () => {
    mockUseMediaQuery.mockImplementation(() => true)
    const { result } = renderHook(() => useSectionWidthMediaQuery())
    expect(result.current).toEqual('100vw')
  })
})
