import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useCreateTokenStore } from '../../state/CreateTokenStore'


type Props = {
    onDismiss: () => void;
}


function Transaction({ onDismiss }: Props): JSX.Element | null {
    const creatingToken = useCreateTokenStore()

    if (creatingToken.transaction == null) {
        return null
    }

    return ReactDOM.createPortal(
        <div className="popup">
            <div className="popup-overlay" />
            <div className="popup__wrap">
                <Button
                    btnStyles="popup-close"
                    type="icon"
                    onClick={onDismiss}
                >
                    <Icon icon="close" />
                </Button>
                <h2 className="popup-title">
                    Token receipt
                </h2>
                {creatingToken.transaction.success ? (
                    <>
                        <div className="popup-main">
                            <div className="popup-main__name">
                                Token deployed
                            </div>
                        </div>
                        <div
                            className="popup-txt"
                            dangerouslySetInnerHTML={{
                                __html: `<p>Token ${creatingToken.transaction.name} deployed successfully.</p>
                                        <p>${creatingToken.transaction.symbol} token root <a href="https://devnet.venomscan.com/accounts/${creatingToken.transaction.root}" target="_blank" rel="nofollow noopener noreferrer">contract</a>.</p>
                                        <p>You can view the result transaction in the <a href="https://devnet.venomscan.com/transactions/${creatingToken.transaction.hash}" target="_blank" rel="nofollow noopener noreferrer">explorer</a>.</p>`
                            }}
                        />
                    </>
                ) : (
                    <div className="popup-main">
                        <div className="popup-main__ava error" />
                        <div className="popup-main__name">
                            Token not deployed
                        </div>
                    </div>
                )}
                <Button
                    block
                    btnStyles="popup-btn"
                    type="primary"
                    onClick={onDismiss}
                >
                    Close
                </Button>
            </div>
        </div>,
        document.body,
    )
}

export const BuilderTransaction = observer(Transaction)
