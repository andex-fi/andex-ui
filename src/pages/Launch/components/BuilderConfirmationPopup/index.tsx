/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';

import { Button } from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { useManageTokenStore } from "../../state/ManageTokenStore";

function Modal(): JSX.Element | null {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const managingToken = useManageTokenStore(tokenRoot!)

    if (!managingToken.isMinting && !managingToken.isBurning && !managingToken.isTransfer) {
        return null
    }

    return ReactDOM.createPortal(
        <div className=''>
            <div className='' />
            <div className=''>
                <Button
                    btnStyles=''
                    type='icon'
                    disabled
                >
                    <Icon icon='close' />
                </Button>
                <div className=''>
                    <Icon icon="loader" ratio={2} />
                </div>
                {managingToken.isMinting && (
                    <>
                        <h3>
                            Waiting for Minting
                        </h3>
                        <p>
                            Minting tokens
                        </p>
                    </>
                )}
                {managingToken.isBurning && (
                    <>
                        <h3>
                            Waiting for Burning
                        </h3>
                        <p>
                            Burning Token
                        </p>
                    </>
                )}
                {managingToken.isTransfer && (
                    <>
                        <h3>
                            Waiting for Transfer
                        </h3>
                        <p>
                            Transfer is in Progress
                        </p>
                    </>
                )}
            </div>
        </div>,
        document.body,
    )
}

export const BuilderConfirmationPopup = observer(Modal)