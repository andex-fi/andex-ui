
type Props = {
    title: string,
    text?: string,
    theme?: 'danger' | 'warning'
}

export function Warning({
    title,
    text,
    // theme = 'danger',
}: Props): JSX.Element {
    return (
        <div
            className=""
        >
            <h4 className="warning__title">{title}</h4>

            {text && (
                <div className="warning__text" dangerouslySetInnerHTML={{ __html: text }} />
            )}
        </div>
    )
}
