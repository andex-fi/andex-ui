import { Link } from 'react-router-dom'
import { Td } from '@andex/uikit'
import { Token } from '../../../../constants'
import { formattedAmount, sliceAddress } from '../../../../utils'

type Props = {
    token: Token;
}

export const Item: React.FC<Props> = ({ token }) => {
    return (
        <>
            <Td><Link to={`/builder/${token.root}`} >{token.name}</Link></Td>
            <Td><Link to={`/builder/${token.root}`} >{token.symbol}</Link></Td>
            <Td>{token.decimals}</Td>
            <Td>{formattedAmount(token.totalSupply, token.decimals)}</Td>
            <Td><Link to={`/builder/${token.root}`} >{sliceAddress(token.root)}</Link></Td>
        </>
    )
}
