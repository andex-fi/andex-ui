import { observer } from 'mobx-react-lite'

import { TokenIcon, TokenIconProps } from '../TokenIcon'
import { useTokensCache } from '../../state/TokensCacheService'


type Props = {
    address: string;
    icon?: string;
    size?: TokenIconProps['size'];
    symbol?: string;
}

function TokenInner({
    address,
    icon,
    size = 'small',
    symbol,
}: Props): JSX.Element {
    const tokensCache = useTokensCache()
    const token = tokensCache.get(address)

    return (
        <div
            className=""
        >
            <TokenIcon
                address={token?.root ?? address}
                icon={token?.icon ?? icon}
                size={size}
            />
            {token?.symbol ?? symbol}
        </div>
    )
}

export const Token = observer(TokenInner)
