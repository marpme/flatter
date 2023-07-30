import { Text, Tooltip } from '@geist-ui/core'
import { useMemo, FC, ReactNode } from 'react'

import styles from './TextHighlighter.module.css'

export type TextScannerProps = {
  text: string
  highlight: string
  tooltip: ReactNode | string
}

export const TextHighlighter: FC<TextScannerProps> = ({
  text,
  highlight,
  tooltip,
}) =>
  useMemo(() => {
    return text
      .split(highlight)
      .map((text, index) => <span key={index}>{text}</span>)
      .reduce((prev, curr) => (
        <>
          {prev}
          <Tooltip type="dark" text={tooltip}>
            <Text b className={styles.wbsInform}>
              {highlight}
            </Text>
          </Tooltip>
          {curr}
        </>
      ))
  }, [text, highlight, tooltip])
