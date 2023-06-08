import classNames from 'classnames'

import { Icon } from '../Icon'

import './index.scss'

type Props = {
    className?: string;
    slim?: boolean
    size?: 's' | 'l'
}

export function ContentLoader({
    className,
    slim,
    size,
}: Props): JSX.Element {
    return (
        <div
            className={classNames('content-loader', {
                'content-loader_slim': slim,
                [`content-loader_size_${size}`]: size,
            }, className)}
        >
            <Icon icon="loader" />
        </div>
    )
}
