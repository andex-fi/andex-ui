import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { ContentLoader } from '../../../../components/ContentLoader'
import { Item } from './Item'
import { useBuilderStore } from '../../state/BuilderStore'


export function TokensList(): JSX.Element {
    const builder = useBuilderStore()

    switch (true) {
        case builder.isLoading:
            return <ContentLoader />

        case builder.tokens.length === 0 && !!builder.filter:
            return (
                <div className="message">
                    <p className="message__text">
                        Token not found
                    </p>
                    <Button btnStyles="" link="/builder/create" type="primary">
                        Create new one
                    </Button>
                </div>
            )

        case builder.tokens.length === 0 && !builder.filter:
            return (
                <div className="message">
                    <p className="message__text">
                        You don't have any token
                    </p>
                    <Button btnStyles="" link="/builder/create" type="primary">
                        Create new one
                    </Button>
                </div>
            )

        default:
            return (
                <div className="tokens-list list">
                    <div className="list__header">
                        <div className="list__cell list__cell--left">
                            Name
                        </div>
                        <div className="list__cell list__cell--center">
                            Symbol
                        </div>
                        <div className="list__cell list__cell--center">
                            Decimals
                        </div>
                        <div className="list__cell list__cell--center">
                            Total Supply
                        </div>
                        <div className="list__cell list__cell--center">
                            Root
                        </div>
                    </div>

                    {builder.tokens.map(token => (
                        <Item key={token.root} token={token} />
                    ))}
                </div>
            )
    }
}

export const BuilderTokensList = observer(TokensList)
