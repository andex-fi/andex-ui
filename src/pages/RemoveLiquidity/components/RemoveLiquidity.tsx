import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import BigNumber from "bignumber.js";
import { reaction } from "mobx";
import { Observer } from "mobx-react-lite";

import { AmountInput } from "../../../components/AmountInput";
import { Warning } from "../../../components/Warning";
import { Placeholder } from "../../../components/Placeholder";
import type { URLTokensParams } from "../../../routes";
import { useRemoveLiquidityFormStoreContext } from "../../../contexts";
import { useRemoveLiquidityForm } from "../hooks";
import { RemoveLiquiditySubmitButton } from "./RemoveLiquiditySubmitButton";
import { error, formattedTokenAmount, isGoodBignumber, makeArray, stripHtmlTags, uniqueId } from '../../../utils'
import { TokenSelector } from "../../../components/TokenSelector";
import { Token } from "../../../components/Token";


export const RemoveLiquidity: FC = () => {
    const { leftTokenRoot, rightTokenRoot } = useParams<URLTokensParams>()
    const formStore = useRemoveLiquidityFormStoreContext()
    const form = useRemoveLiquidityForm()

    const onMaximize = () => {
        formStore.setData('amount', new BigNumber(formStore.pool?.lp.userBalance ?? 0).shiftedBy(-(formStore.pool?.lp.decimals ?? 0)).toFixed())
    }

    useEffect(() => {
        const tokensListDisposer = reaction(
            () => formStore.tokensCache.isReady,
            async isReady => {
                formStore.setState('isPreparing', true)
                if (isReady) {
                    try {
                        await form.resolveStateFromUrl(leftTokenRoot, rightTokenRoot)
                        await formStore.init()
                    }
                    catch (e) {
                        error('Remove Liquidity Form Store initializing error', e)
                    }
                    finally {
                        formStore.setState('isPreparing', false)
                    }
                }
            },
            { fireImmediately: true },
        )

        return () => {
            tokensListDisposer()
            formStore.dispose().catch(reason => error(reason))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4 py-10 ">
            <div className="w-full md:w-[30rem] bg-white dark:bg-purple-darkest rounded-2xl p-6">
                <div className="w-full flex items-center justify-between">
                    <Link to="/pools">
                        <MdOutlineKeyboardArrowLeft />
                    </Link>
                    <h3 className="font-extrabold">Remove Liquidity</h3>
                    <FiSettings />
                </div>

                <Observer>
                    {() => {
                        const isSyncingPool = formStore.isSyncingPool === undefined || formStore.isSyncingPool
                        const tokensSelected = (
                            formStore.leftToken?.root !== undefined
                            && formStore.rightToken?.root !== undefined
                        )
                        
                        return (
                            <div className="dark:bg-purple-dark">
                                <div>
                                    <div>
                                       Select Pair 
                                    </div>
                                    <div>
                                        <TokenSelector
                                            disabled={isSyncingPool}
                                            root={formStore.leftToken?.root}
                                            showIcon
                                            size="medium"
                                            onSelect={form.onSelectLeftToken}
                                        />
                                        <TokenSelector
                                            disabled={isSyncingPool}
                                            root={formStore.rightToken?.root}
                                            showIcon
                                            size="medium"
                                            onSelect={form.onSelectRightToken}
                                        />
                                    </div>
                                </div>

                                {(
                                    formStore.wallet.isReady
                                    && formStore.pool !== undefined
                                    && !isGoodBignumber(formStore.pool?.lp.userBalance ?? 0)
                                    && formStore.isSyncingPool === false
                                    && tokensSelected
                                ) && (
                                    <Warning
                                        title="No Liquidity in this pool"
                                        text={`It seems you don’t have any liquidity locked in this pool. Make sure you have ${stripHtmlTags(formStore.pool.lp.symbol ?? '')} token at your wallet balance.If you use LP tokens for farming, make sure to withdraw them from the farm first.`}
                                    />
                                )}

{(
                                    formStore.wallet.isReady
                                    && formStore.pool === undefined
                                    && formStore.isSyncingPool === false
                                    && tokensSelected
                                ) && (
                                    <Warning
                                        title="Pool doesn't exist"
                                        text="You need to create pool, before you can to continue."
                                    />
                                )}

                                {(isSyncingPool && tokensSelected) ? (
                                    <>
                                        <div>
                                            <div className="liquidity-remove-form__label">
                                                Input an amount of LP tokens to remove
                                            </div>

                                            <AmountInput disabled size="medium" />

                                            <div>&nbsp;</div>
                                        </div>

                                        <div>
                                            <div className="liquidity-remove-form__label liquidity-remove-form__label_medium">
                                                You will receive
                                            </div>
                                            <div className="liquidity-remove-form__cols">
                                                {makeArray(2, uniqueId).map(id => (
                                                    <div
                                                        key={id}
                                                        className="liquidity-remove-form__receive"
                                                    >
                                                        <div
                                                            className="liquidity-remove-form__icons-placeholder"
                                                            style={{ gap: 7 }}
                                                        >
                                                            <Placeholder circle width={20} />
                                                            <Placeholder height={18} width={50} />
                                                        </div>
                                                        <div className="liquidity-remove-form__value">
                                                            &nbsp;
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="liquidity-remove-form__label liquidity-remove-form__label_medium">
                                                Your position in the pool
                                            </div>

                                            <div className="liquidity-remove-form-stats">
                                                <div className="liquidity-remove-form-stats__head">
                                                    <span />
                                                    <span>
                                                        Now
                                                    </span>
                                                    <span>
                                                        After removal
                                                    </span>
                                                </div>

                                                <div className="liquidity-remove-form-stats__item">
                                                    <span>
                                                        Share
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        <Placeholder height={20} width={60} />
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        —
                                                    </span>
                                                </div>

                                                {makeArray(2, uniqueId).map(id => (
                                                    <div key={id} className="liquidity-remove-form-stats__item">
                                                        <span>
                                                            <Placeholder height={20} width={60} />
                                                        </span>
                                                        <span className="liquidity-remove-form-stats__value">
                                                            <Placeholder height={20} width={60} />
                                                        </span>
                                                        <span className="liquidity-remove-form-stats__value">
                                                            —
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    formStore.wallet.isReady
                                    && formStore.pool !== undefined
                                    && formStore.leftToken !== undefined
                                    && formStore.rightToken !== undefined
                                    && isGoodBignumber(formStore.pool?.lp.userBalance ?? 0)
                                    && formStore.isSyncingPool === false
                                ) && (
                                    <>
                                        <div>
                                            <div className="liquidity-remove-form__label">
                                                Input amount of LP tokens to remove
                                            </div>

                                            <AmountInput
                                                decimals={formStore.pool.lp.decimals}
                                                disabled={formStore.isWithdrawingLiquidity}
                                                invalid={!formStore.isAmountValid}
                                                maxIsVisible
                                                size="medium"
                                                value={formStore.amount}
                                                onChange={form.onChangeAmount}
                                                onClickMax={onMaximize}
                                            />

                                            <div
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                    __html: formStore.isAmountValid
                                                        ? `Available balance: ${formattedTokenAmount(
                                                            formStore.pool.lp.userBalance,
                                                            formStore.pool.lp.decimals,
                                                            { preserve: true, roundOn: false },
                                                        )}`
                                                        : `Available balance: ${formattedTokenAmount(
                                                            formStore.pool.lp.userBalance,
                                                            formStore.pool.lp.decimals,
                                                            { preserve: true, roundOn: false },
                                                        )} <br />Requested amount is too big`
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <div className="liquidity-remove-form__label liquidity-remove-form__label_medium">
                                                You will receive
                                            </div>

                                            <div className="liquidity-remove-form__cols">
                                                <div className="liquidity-remove-form__receive">
                                                    <Token
                                                        address={formStore.leftToken.root}
                                                        size="xsmall"
                                                    />
                                                    <div className="liquidity-remove-form__value">
                                                        {formattedTokenAmount(formStore.isReverted
                                                            ? formStore.receiveRight
                                                            : formStore.receiveLeft)}
                                                    </div>
                                                </div>

                                                <div className="liquidity-remove-form__receive">
                                                    <Token
                                                        address={formStore.rightToken.root}
                                                        size="xsmall"
                                                    />
                                                    <div className="liquidity-remove-form__value">
                                                        {formattedTokenAmount(formStore.isReverted
                                                            ? formStore.receiveLeft
                                                            : formStore.receiveRight)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="liquidity-remove-form__label liquidity-remove-form__label_medium">
                                                Your position in the pool
                                            </div>

                                            <div className="liquidity-remove-form-stats">
                                                <div className="liquidity-remove-form-stats__head">
                                                    <span />
                                                    <span>
                                                        Now
                                                    </span>
                                                    <span>
                                                        After Removal
                                                    </span>
                                                </div>

                                                <div className="liquidity-remove-form-stats__item">
                                                    <span>
                                                        Share
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {formattedTokenAmount(formStore.currentSharePercent)}%,
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {isGoodBignumber(formStore.resultingSharePercent ?? 0)
                                                            ? '{value}%'
                                                            : '—'}
                                                    </span>
                                                </div>

                                                <div className="liquidity-remove-form-stats__item">
                                                    <span>
                                                        {formStore.leftToken.symbol}
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {formattedTokenAmount(formStore.currentShareLeft || 0)}
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {isGoodBignumber(formStore.resultingShareLeft ?? 0)
                                                            ? formattedTokenAmount(formStore.resultingShareLeft)
                                                            : '—'}
                                                    </span>
                                                </div>

                                                <div className="liquidity-remove-form-stats__item">
                                                    <span>
                                                        {formStore.rightToken.symbol}
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {formattedTokenAmount(formStore.currentShareRight || 0)}
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {isGoodBignumber(formStore.resultingShareRight ?? 0)
                                                            ? formattedTokenAmount(formStore.resultingShareRight)
                                                            : '—'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <RemoveLiquiditySubmitButton />

                            </div>
                        )
                    }}
                </Observer>
            </div>
        </div>
    )
}