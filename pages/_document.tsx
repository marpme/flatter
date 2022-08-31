import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@geist-ui/core'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const styles = CssBaseline.flush()

        return {
            ...initialProps,
            styles: [
                <Fragment key="1">
                    {initialProps.styles}
                    {styles}
                </Fragment>,
            ],
        }
    }
}
