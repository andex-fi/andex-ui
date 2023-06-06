/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { reaction } from "mobx";
import BigNumber from "bignumber.js";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TokenSelector } from "./TokenSelector";
// import { Button } from "../../../components/Button";
import { Warning } from "../../../components/Warning";
import { AmountInput } from "../../../components/AmountInput";
import { Placeholder } from "../../../components/Placeholder";
import { Token } from "../../../components/Token";
import { Link, useParams } from "react-router-dom";
// import { useAccountContext } from "../../../hooks/useAccountContext";
import { URLTokensParams } from "../../../routes";
import { useRemoveLiquidityForm } from "../hooks";
import { useRemoveLiquidityFormStoreContext } from "../../../contexts";
import {
    error,
    formattedTokenAmount,
    isGoodBignumber,
    makeArray,
    stripHtmlTags,
    uniqueId,
} from "../../../utils";
import { RemoveLiquiditySubmitButton } from "./RemoveLiquiditySubmitButton";

export function RemoveLiquidity(): JSX.Element {
  // const { address, connect } = useAccountContext();
  const { leftTokenRoot, rightTokenRoot } = useParams<URLTokensParams>();

  const formStore = useRemoveLiquidityFormStoreContext();
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
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4 py-10 ">
      <div className="w-full md:w-[40rem] bg-white dark:bg-purple-light rounded-2xl p-6">
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
                    <div className="flex ml-4 gap-20">
                        <div className="">
                            <TokenSelector
                                disabled={isSyncingPool}
                                root={formStore.leftToken?.root}
                                showIcon
                                size="medium"
                                onSelect={form.onSelectLeftToken} 
                            />
                        </div>
                        <div className="">
                            <TokenSelector
                                disabled={isSyncingPool}
                                root={formStore.leftToken?.root}
                                showIcon
                                size="medium"
                                onSelect={form.onSelectLeftToken}  
                            />
                        </div>

                        {(
                            formStore.wallet.isReady
                            && formStore.pool !== undefined
                            && !isGoodBignumber(formStore.pool?.lp.userBalance ?? 0)
                            && formStore.isSyncingPool === false
                            && tokensSelected
                        ) && (
                            <Warning
                                title="No liquidity in this pool"
                                text={`It seems you don’t have any liquidity locked in this pool. Make sure you have ${stripHtmlTags(formStore.pool.lp.symbol ?? '')} token at your wallet balance. If you use LP tokens for farming, make sure to withdraw them from the farm first`}
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
                                            <div className="text-18 font-bold tracking-0.3 leading-24 mb-16">
                                                Input an amount of LP tokens to remove
                                            </div>

                                            <AmountInput disabled size="medium" />

                                            <div>&nbsp;</div>
                                        </div>

                                        <div>
                                            <div className="text-16 font-bold tracking-0.25 leading-20 mb-16">
                                                You will receive
                                            </div>
                                            <div className="grid gap-10 grid-cols-auto min-w-0 md:grid-flow-col md:grid-flow-row">
                                                {makeArray(2, uniqueId).map(id => (
                                                    <div
                                                        key={id}
                                                        className="items-start bg-white-8 flex flex-col text-24 font-bold gap-4 overflow-hidden p-16 break-words"
                                                    >
                                                        <div
                                                            className="items-center flex gap-24"
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
                                            <div className="text-16 font-bold tracking-0.25 leading-20 mb-16">
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
                                                Input an amount of LP tokens to remove
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
                                                className='liquidity-remove-form__hint'
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
                                                        )}. Requested amount is too big`,
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
                                                        After removal
                                                    </span>
                                                </div>

                                                <div className="liquidity-remove-form-stats__item">
                                                    <span>
                                                        Share
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {formattedTokenAmount(formStore.currentSharePercent)}%
                                                    </span>
                                                    <span className="liquidity-remove-form-stats__value">
                                                        {isGoodBignumber(formStore.resultingSharePercent ?? 0)
                                                            ? (formStore.resultingSharePercent)
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
                       
                    </div>
                )
            }}
            {/*
            {address ? (
            <Button btnStyles="bg-[#52058F] dark:bg-purple-lightest w-full flex items-center justify-center py-4 rounded-lg mt-4 text-white font-bold">
            Remove Liquidity
            </Button>
            ) : (
            <Button
                onClick={() => {
                connect();
                }}
                btnStyles="bg-[#52058F] dark:bg-purple-lightest w-full flex items-center justify-center py-4 rounded-lg mt-4 text-white font-bold"
            >
                Connect wallet
            </Button>
            )}*/}
        </Observer>
        <RemoveLiquiditySubmitButton />
      </div>
    </div>
  );
}
