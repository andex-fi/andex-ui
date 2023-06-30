import * as React from 'react'

type Props = {
    messages: React.ReactNode | React.ReactNode[];
    title?: React.ReactNode | null;
}

const Messages: React.FC<Props> = ({ messages, title }) => {
    const messagesArray = Array.isArray(messages) ? messages : [messages]

    return (
        <div className="notification">
            {title ? (
                <h4 key="heading" className="notification-title">{title}</h4>
            ) : null}

            {messagesArray.map(message => (
                <React.Fragment key={`${message}`}>
                    {message}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Messages;
