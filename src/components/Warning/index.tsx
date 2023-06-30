
type Props = {
    title: string,
    text?: string,
    theme?: 'danger' | 'warning'
}

const Warning: React.FC<Props> = ({
    title,
    text,
    // theme = 'danger',
}) => {
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

export default Warning;