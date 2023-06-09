import { Link } from 'react-router-dom'

import { Token } from '../../../../constants'
import { formattedAmount, sliceAddress } from '../../../../utils'


type Props = {
    token: Token;
}

export function Item({ token }: Props): JSX.Element {
    return (
        <Link
            to={`/builder/${token.root}`}
            className="flex flex-col min-h-400 overflow-x-auto w-full items-center border-b border-white border-opacity-8 gap-4 grid grid-cols-auto min-h-[57px] py-2 text-no-underline cursor-pointer"
        >
            <div className="flex flex-col min-h-400 overflow-x-auto w-full text-base font-medium leading-5 min-w-min overflow-hidden truncate whitespace-nowrap text-left">
                {token.name}
            </div>
            <div className="flex flex-col min-h-400 overflow-x-auto w-full text-base font-medium leading-5 min-w-min overflow-hidden truncate whitespace-nowrap text-center">
                {token.symbol}
            </div>
            <div className="flex flex-col min-h-400 overflow-x-auto w-full text-base font-medium leading-5 min-w-min overflow-hidden truncate whitespace-nowrap text-center">
                {token.decimals}
            </div>
            <div className="flex flex-col min-h-400 overflow-x-auto w-full text-base font-medium leading-5 min-w-min overflow-hidden truncate whitespace-nowrap text-center">
                {formattedAmount(token.totalSupply, token.decimals)}
            </div>
            <div className="flex flex-col min-h-400 overflow-x-auto w-full text-base font-medium leading-5 min-w-min overflow-hidden truncate whitespace-nowrap text-center">
                {sliceAddress(token.root)}
            </div>
        </Link>
    )
}
