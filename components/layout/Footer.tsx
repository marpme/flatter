import { Link } from '@geist-ui/core'
import { Github, Twitter } from '@geist-ui/icons'
import { FC } from 'react'

export const Footer: FC = () => (
    <div
        style={{
            display: 'flex',
            gap: '35px',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50px',
            marginTop: '50px',
        }}
    >
        made with ❤️ in Berlin <span>&mdash;</span>
        <Link
            href="https://github.com/marpme/flatter"
            style={{ alignItems: 'center', gap: '5px' }}
            color
        >
            <Github size={16} /> Github
        </Link>
        <Link
            href="https://twitter.com/marpme_"
            style={{ alignItems: 'center', gap: '5px' }}
            color
        >
            <Twitter size={16} /> Twitter
        </Link>
    </div>
)
