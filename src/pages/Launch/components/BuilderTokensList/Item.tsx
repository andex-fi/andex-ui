import { Link } from 'react-router-dom'

import { Token } from '../../../../constants'
import { appRoutes } from '../../../../routes'
import { formattedAmount, sliceAddress } from '../../../../utils'


type Props = {
    token: Token;
}

export function Item({ token }: Props): JSX.Element {
    return (
        <Link
            to={appRoutes.builderItem.makeUrl({ tokenRoot: token.root })}
            className="list__row list__row--pointer"
        >
            <div className="list__cell list__cell--left">
                {token.name}
            </div>
            <div className="list__cell list__cell--center">
                {token.symbol}
            </div>
            <div className="list__cell list__cell--center">
                {token.decimals}
            </div>
            <div className="list__cell list__cell--center">
                {formattedAmount(token.totalSupply, token.decimals)}
            </div>
            <div className="list__cell list__cell--center">
                {sliceAddress(token.root)}
            </div>
        </Link>
    )
}
