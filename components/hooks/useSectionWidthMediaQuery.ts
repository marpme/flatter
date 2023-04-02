import { useMediaQuery } from '@geist-ui/core'

export const useSectionWidthMediaQuery = (): string | undefined => {
    const isSMOrSmaller = useMediaQuery('sm', {
        match: 'down',
    })

    return isSMOrSmaller ? '100vw' : undefined
}
