import { Text } from '@geist-ui/core'
import { FC, ReactElement } from 'react'
import { SITE_NAME } from './Head'

export const Header: FC<{ subHeader: ReactElement }> = ({ subHeader }) => (
    <header
        style={{
            marginBottom: '2em',
        }}
    >
        <Text h1 style={{ letterSpacing: '.03em' }} data-testid="header-name">
            🏘️ {SITE_NAME}
        </Text>
        {subHeader}
    </header>
)
