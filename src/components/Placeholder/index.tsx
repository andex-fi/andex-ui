import * as React from 'react'

type Props = Pick<React.CSSProperties, 'height' | 'width'> & {
    circle?: boolean;
    className?: string;
}

const Placeholder: React.FC<Props> = ({
    circle,
    // className,
    ...props
}) => {
    const width = typeof props.width === 'string' ? props.width : `${props.width}px`
    const height = typeof props.height === 'string' ? props.height : `${props.height}px`

    return (
        <span
            className=""
            style={{
                height: circle ? width : height,
                width,
            }}
        >
            {'\u200B'}
        </span>
    )
}

export default Placeholder;
