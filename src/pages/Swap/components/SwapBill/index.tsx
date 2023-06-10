import { observer } from 'mobx-react-lite'

import { Icon } from '../../../../components/Icon'
import { formattedAmount, formattedTokenAmount, stripHtmlTags } from '../../../../utils'
import { useSwapFormStoreContext } from '../../context'
import { SwapDirection } from '../../types'
import { Button } from '../../../../components/Button'


function SwapBillInternal(): JSX.Element | null {
    const formStore = useSwapFormStoreContext()

    if (formStore.leftToken === undefined || formStore.rightToken === undefined) {
        return null
    }

    const isCurrencyOnLeft = formStore.coinSide === 'leftToken'
    const isCurrencyOnRight = formStore.coinSide === 'rightToken'
    const leftSymbol = isCurrencyOnLeft ? formStore.wallet.coin.symbol : formStore.leftToken?.symbol
    const rightSymbol = isCurrencyOnRight ? formStore.wallet.coin.symbol : formStore.rightToken?.symbol

    return (
        <div className="list-bill">
            {(
                formStore.ltrPrice !== undefined
                && formStore.rtlPrice !== undefined
                && formStore.route !== undefined
                && !formStore.isConversionMode
            ) && (
                <div key="prices" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Price
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        {formStore.priceDirection === SwapDirection.RTL ? (
                            <span
                                key={SwapDirection.RTL}
                                dangerouslySetInnerHTML={{
                                    __html: `${formattedAmount(formStore.ltrPrice)} ${stripHtmlTags(leftSymbol ?? '')}&nbsp;per&nbsp;1&nbsp;${stripHtmlTags(rightSymbol ?? '')}`
                                }}
                            />
                        ) : (
                            <span
                                key={SwapDirection.LTR}
                                dangerouslySetInnerHTML={{
                                    __html: `${formattedAmount(formStore.rtlPrice)} ${stripHtmlTags(leftSymbol ?? '')}&nbsp;per&nbsp;1&nbsp;${stripHtmlTags(rightSymbol ?? '')}`
                                }}
                            />
                        )}
                        <Button
                            size="xs"
                            btnStyles="list-bill__val--btn"
                            onClick={formStore.togglePriceDirection}
                        >
                            <Icon icon="reverseHorizontal" />
                        </Button>
                    </div>
                </div>
            )}

            {(
                formStore.route?.steps !== undefined
                && formStore.route.steps.length > 1
                && !formStore.isConversionMode
            ) && (
                <div key="route" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Route
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        <ul className="breadcrumb" style={{ margin: 0 }}>
                            <li>
                                <span>{leftSymbol}</span>
                            </li>
                            { formStore.route.steps?.slice(0, -1).map(step => (
                                <li key={step.receiveToken.root}>
                                    <span>{step.receiveToken.symbol}</span>
                                </li>
                            ))}
                            <li>
                                <span>{rightSymbol}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {(formStore.route?.slippage !== undefined && formStore.bill?.minExpectedAmount !== undefined) && (
                <div key="slippage" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Slippage tolerance
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        {`${formattedAmount(formStore.route.slippage)}%`}
                    </div>
                </div>
            )}

            {formStore.bill?.minExpectedAmount !== undefined && (
                <div key="minExpectedAmount" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Minimum receive
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        {`${formattedTokenAmount(
                            formStore.bill.minExpectedAmount ?? 0,
                            formStore.rightTokenDecimals,
                        )} ${rightSymbol}`}
                    </div>
                </div>
            )}

            {formStore.bill?.priceImpact !== undefined && (
                <div key="priceImpact" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Price impact
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        {`<${formattedAmount(formStore.bill?.priceImpact || 0, undefined, {
                            precision: 1,
                        })}%`}
                    </div>
                </div>
            )}

            {formStore.bill?.fee !== undefined && (
                <div key="fee" className="list-bill__row">
                    <div className="list-bill__info">
                        <span>
                            Fee
                        </span>
                        <span className="list-bill__icn">
                            <Icon icon="info" />
                        </span>
                    </div>
                    <div className="list-bill__val">
                        {`${formattedTokenAmount(
                            formStore.bill.fee,
                            formStore.leftTokenDecimals,
                        )} ${leftSymbol}`}
                    </div>
                </div>
            )}
        </div>
    )
}


export const SwapBill = observer(SwapBillInternal)
