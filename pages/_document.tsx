import { Fragment } from 'react'
import Document from 'next/document'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { CssBaseline } from '@geist-ui/core'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
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
