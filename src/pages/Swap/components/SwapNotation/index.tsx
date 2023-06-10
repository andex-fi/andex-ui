import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { TokenIcons } from '../../../../components/TokenIcons'
import { useSwapFormStoreContext } from '../../context'
import { storage } from '../../../../utils'


function SwapNotationInternal(): JSX.Element | null {
    const formStore = useSwapFormStoreContext()

    const [available, setAvailable] = React.useState(storage.get('swap_notation') == null)

    if (formStore.wallet.isInitializing || formStore.wallet.isUpdatingContract) {
        return null
    }

    if (
        !formStore.wallet.hasProvider
        || !formStore.wallet.isConnected
        || (formStore.wallet.isConnected && formStore.wallet.balance === '0')
    ) {
        const connect: React.MouseEventHandler<HTMLAnchorElement> = async event => {
            event.preventDefault()
            await formStore.wallet.connect()
        }
        return (
            <div className="card swap-notation-newbie">
                <div>
                    <h3>New to Andex?</h3>
                    {(!formStore.wallet.hasProvider || !formStore.wallet.isConnected) ? (
                        <p>It only takes 2 steps to get the best out of Andex:</p>
                    ) : (
                        <>
                            <p>You successfully installed and connected Venom Wallet.</p>
                            <p>It only takes 1 last step to get the best out of Andex:</p>
                        </>
                    )}
                    <p>
                        {!formStore.wallet.hasProvider && (
                            <a
                                className="swap-notation-link"
                                href="https://l1.broxus.com/everscale/wallet"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Install Venom Wallet
                                <Icon icon="chevronRight" />
                            </a>
                        )}
                        {(formStore.wallet.hasProvider && !formStore.wallet.isConnected) && (
                            <a
                                className="swap-notation-link"
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={connect}
                            >
                                Connect Wallet
                                <Icon icon="chevronRight" />
                            </a>
                        )}
                    </p>
                    <p>
                        <a
                            className="swap-notation-link"
                            href="https://docs.andex.finance/use/getting-started/how-to-get-ever"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Venom
                            <Icon icon="chevronRight" />
                        </a>
                    </p>
                </div>

                <footer>
                    <p>
                        Any Questions?
                    </p>
                    <p>
                        <a
                            className="swap-notation-link"
                            href="https://t.me/FlatQube"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Join our Discord
                            <Icon icon="chevronRight" />
                        </a>
                    </p>
                </footer>
            </div>
        )
    }

    if (formStore.wallet.isConnected && available) {
        const onDismiss = () => {
            storage.set('swap_notation', '1')
            setAvailable(false)
        }

        return (
            <div className="card swap-notation">
                <div>
                    <Button
                        type="icon"
                        btnStyles="popup-close"
                        onClick={onDismiss}
                    >
                        <Icon icon="close" />
                    </Button>
                    <div className="swap-notation__icon-holders">
                        <TokenIcons
                            icons={[
                                { icon: 'https://raw.githubusercontent.com/andex-fi/token-lists/master/icons/WVENOM/logo.svg' },
                                { icon: formStore.wallet.coin.icon },
                            ]}
                            size="medium"
                        />
                    </div>
                    <h3>
                        From now on Venom can be used on Andex
                    </h3>
                    <p>
                        Your default balance on the DEX will now be the cumulative balance of your Venom and wVenom, which you can swap for any other TIP-3.1 tokens.
                    </p>
                    <p>
                        You can also swap by using only your Venom or wVenom balance, if preferable.
                    </p>
                </div>
                <footer>
                    <p>
                        <a
                            className="swap-notation-link"
                            href="https://docs.flatqube.io/use/swap/how-to/make-a-basic-swap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            How to swap
                            <Icon icon="chevronRight" />
                        </a>
                    </p>
                </footer>
            </div>
        )
    }

    return null
}

export const SwapNotation = observer(SwapNotationInternal)
