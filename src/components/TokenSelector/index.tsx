import * as React from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { TokenIcon } from '../TokenIcon'
import { TokensList } from '../TokensList'
import { useTokensCache } from '../../state/TokensCacheService'

type Props = {
    disabled?: boolean;
    root?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onSelect?: (root: string) => void;
    size?: 'small' | 'medium';
    showIcon?: boolean;
}

export function TokenSelector({
    disabled,
    root,
    onOpen,
    onClose,
    onSelect,
    // size = 'small',
    showIcon,
}: Props): JSX.Element {
    const tokensCache = useTokensCache()
    const token = root && tokensCache.get(root)
    const [listVisible, setListVisible] = React.useState(false)

    const placeholder = "Select a token..."

    const close = () => {
        setListVisible(false)
        if (onClose) {
            onClose()
        }
    }

    const open = () => {
        setListVisible(true)
        if (onOpen) {
            onOpen()
        }
    }

    const select = (_root: string) => {
        if (onSelect) {
            onSelect(_root)
        }
        close()
    }

    React.useEffect(() => {
        if (root) {
            (async () => {
                await tokensCache.syncCustomToken(root)
            })()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [root])

    return (
        <>
            <Button
                disabled={disabled}
                btnStyles=""
                onClick={open}
            >
                <span
                    className="token-selector__value"
                    title={token ? token.symbol : placeholder}
                >
                    {showIcon && token && (
                        <TokenIcon
                            size="small"
                            address={token.root}
                            icon={token.icon}
                        />
                    )}
                    <span className="token-selector__symbol">
                        {token ? token.symbol : placeholder}
                    </span>
                </span>
                <Icon icon="arrowDown" />
            </Button>

            {listVisible && (
                <TokensList
                    onDismiss={close}
                    onSelectToken={select}
                />
            )}
        </>
    )
}
