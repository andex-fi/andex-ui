import { Observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useSwapFormStoreContext } from '../../context'
import { SwapDirection } from '../../types'
import { formattedTokenAmount, stripHtmlTags } from '../../../../utils'


export function SwapPrice(): JSX.Element | null {
    const formStore = useSwapFormStoreContext()

    if (formStore.leftToken === undefined || formStore.rightToken === undefined) {
        return null
    }

    return (
        <div className="form-row swap-price">
            <div />
            <div className="swap-price-details">
                <Observer>
                    {() => {
                        const { coinSide, priceDirection } = formStore
                        const isCurrencyOnLeft = coinSide === 'leftToken'
                        const isCurrencyOnRight = coinSide === 'rightToken'
                        const leftSymbol = isCurrencyOnLeft
                            ? formStore.wallet.coin.symbol
                            : formStore.leftToken?.symbol
                        const rightSymbol = isCurrencyOnRight
                            ? formStore.wallet.coin.symbol
                            : formStore.rightToken?.symbol

                        return priceDirection === SwapDirection.RTL ? (
                            <span
                                key={SwapDirection.RTL}
                                dangerouslySetInnerHTML={{
                                    __html: `${formattedTokenAmount(formStore.ltrPrice)} ${stripHtmlTags(leftSymbol ?? '')}&nbsp;per&nbsp;1&nbsp;${stripHtmlTags(rightSymbol ?? '')}`,
                                }}
                            />
                        ) : (
                            <span
                                key={SwapDirection.LTR}
                                dangerouslySetInnerHTML={{
                                    __html: `${formattedTokenAmount(formStore.rtlPrice)} ${stripHtmlTags(rightSymbol ?? '')}&nbsp;per&nbsp;1&nbsp;${stripHtmlTags(leftSymbol ?? '')}`,
                                }}
                            />
                        )
                    }}
                </Observer>
                <Button
                    size="xs"
                    btnStyles="swap-price__reverse-btn"
                    onClick={formStore.togglePriceDirection}
                >
                    <Icon icon="reverseHorizontal" />
                </Button>
            </div>
        </div>
    )
}
