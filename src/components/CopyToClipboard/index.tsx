import { useState, useRef} from 'react'

import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

type Props = {
    text: string;
}

export function CopyToClipboard({
    text,
}: Props): JSX.Element | null {
    const containerRef = useRef<HTMLSpanElement | null>(null)
    const [success, setSuccess] = useState(false)

    if (!navigator || !navigator.clipboard) {
        return null
    }

    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
    }

    return (
        <>
            <span
                className=""
                onClick={copy}
                ref={containerRef}
            >
                <Icon icon="copy" onClick={copy} />
            </span>
            {success && (
                <Tooltip
                    forceShow
                    target={containerRef}
                    alignX="center"
                    alignY="top"
                    size="small"
                >
                    Copied
                </Tooltip>
            )}
        </>
    )
}
