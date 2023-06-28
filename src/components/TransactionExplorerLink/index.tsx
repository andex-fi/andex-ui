import * as React from 'react'

import { sliceAddress } from '../../utils'


type Props = React.PropsWithChildren<{
    className?: string;
    id: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>

const TransactionExplorerLink: React.FC<Props> = (props) => {

    const { children, className, id, onClick } = props

    return (
        <a
            className={className}
            href={`https://devnet.venomscan.com/transactions/${id}`}
            title={`Open in Explorer`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
        >
            {children || sliceAddress(id)}
        </a>
    )
}

export default TransactionExplorerLink;
