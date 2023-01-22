import type { Icon } from '@geist-ui/icons'
import React, { FC, ReactElement, ReactNode } from 'react'

export const IconText: FC<{
    IconElement: Icon
    children: ReactNode | ReactNode[]
    style?: React.CSSProperties
}> = ({ IconElement, children, style }) => (
    <div
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            ...style,
        }}
    >
        <IconElement size={16} /> {children}
    </div>
)
