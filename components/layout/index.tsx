import { Page, Text } from '@geist-ui/core'
import { FC, ReactElement } from 'react'
import { useSectionWidthMediaQuery } from '../hooks/useSectionWidthMediaQuery'
import { Footer } from './Footer'
import { Head } from './Head'
import { Header } from './Header'

const Layout: FC<{ children: ReactElement; header: ReactElement }> = ({
    children,
    header,
}) => {
    const width = useSectionWidthMediaQuery()
    return (
        <Page dotBackdrop width={width}>
            <Head />
            <Header subHeader={header} />
            {children}
            <Footer />
        </Page>
    )
}

export default Layout
