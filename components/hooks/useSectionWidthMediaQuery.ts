import { useMediaQuery } from '@geist-ui/core'

export const useSectionWidthMediaQuery = (): string | undefined => {
    const isXS = useMediaQuery('xs')

    return isXS ? '100vw' : undefined
}
