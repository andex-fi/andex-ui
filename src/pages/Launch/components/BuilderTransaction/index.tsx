import * as ReactDOM from 'react-dom'
import { observer } from 'mobx-react-lite' 

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useCreateTokenStore } from '../../state/CreateTokenStore'
import classNames from 'classnames'


type Props = {
    onDismiss: () => void;
}


function Transaction({ onDismiss }: Props): JSX.Element | null {
    const creatingToken = useCreateTokenStore()

    if (creatingToken.transaction == null) {
        return null
    }

    return ReactDOM.createPortal(
        <div className="popup backdrop-blur-[9px] fixed inset-0 flex justify-center items-center">
            <div className="popup-overlay" />
            <div className="popup__wrap bg-white dark:bg-purple-dark shadow-3xl rounded-[24px] absolute top-[20%] flex flex-col gap-7 w-[35rem] p-5">
                {/* <Button
                    btnStyles="popup-close"
                    type="icon"
                    onClick={onDismiss}
                >
                    <Icon icon="close" />
                </Button> */}
                <h2 className="popup-title font-bold text-[20px]">
                    Token Receipt
                </h2>
                {creatingToken.transaction.success ? (
                    <>
                        <div className="popup-main">
                            <div className="popup-main__name bg-[#F4F5FA] dark:bg-purple-light font-bold p-5 rounded-[12px]">
                                Token deployed
                            </div>
                        </div>
                        <div
                            className="popup-txt font-medium flex flex-col gap-3 text-[#7F8FA9]"
                            dangerouslySetInnerHTML={{
                                __html: `<p>Token ${creatingToken.transaction.name} deployed successfully</p>
                                        <p>${creatingToken.transaction.symbol} token root <a href="https://devnet.venomscan.com/accounts/${creatingToken.transaction.root}" target="_blank" rel="nofollow noopener noreferrer"} style='color: #9645D7; text-decoration: underline'>contract</a></p>
                                        <p>You can view the result transaction in the <a href="https://devnet.venomscan.com/transactions/${creatingToken.transaction.hash}" target="_blank" rel="nofollow noopener noreferrer" style='color: #9645D7; text-decoration: underline'>explorer</a></p>`
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
                    btnStyles="popup-btn bg-purple-light dark:bg-purple-lightest rounded-[12px] text-white p-5 font-bold"
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
