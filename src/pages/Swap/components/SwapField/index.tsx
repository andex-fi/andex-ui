import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { TokenIcon } from '../../../../components/TokenIcon'
import { TokenIcons } from '../../../../components/TokenIcons'
import { useField } from '../../../../hooks/useField'
import { WalletNativeCoin } from '../../../../state/WalletService'
import type { TokenCache } from '../../../../state/TokensCacheService'
import { useSwapFormStoreContext } from '../../context'


type Props = {
    balance?: string;
    disabled?: boolean;
    label?: string;
    id?: string;
    isMultiple?: boolean;
    isValid?: boolean;
    nativeCoin?: WalletNativeCoin;
    readOnly?: boolean;
    showMaximizeButton?: boolean;
    token?: TokenCache;
    value?: string;
    onChange?: (value: string) => void;
    onMaximize?: () => void;
    onToggleTokensList?: () => void;
}


function Field({
    balance = '0',
    isMultiple = false,
    isValid = true,
    nativeCoin,
    showMaximizeButton,
    token,
    ...props
}: Props): JSX.Element {
    const field = useField({
        decimals: nativeCoin !== undefined ? nativeCoin.decimals : token?.decimals,
        value: props.value,
        // eslint-disable-next-line sort-keys
        onChange: props.onChange,
    })
    const formStore = useSwapFormStoreContext()

    return (
        <label className="form-label" htmlFor={props.id}>
            <fieldset
                className={classNames('form-fieldset', {
                    checking: formStore.tokensCache.isTokenUpdatingBalance(token?.root) && !props.disabled,
                    invalid: !isValid,
                })}
            >
                <div className="form-fieldset__main">
                    <input
                        autoComplete="off"
                        className="form-input"
                        id={props.id}
                        inputMode="decimal"
                        pattern="^[0-9]*[.]?[0-9]*$"
                        placeholder="0.0"
                        readOnly={props.readOnly}
                        type="text"
                        value={props.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                    />

                    {(() => {
                        switch (true) {
                            case isMultiple:
                                return (
                                    <Button
                                        key="change-token"
                                        btnStyles={classNames('form-drop form-drop-extra', {
                                            disabled: props.disabled,
                                        })}
                                        disabled={props.disabled}
                                        onClick={props.onToggleTokensList}
                                    >
                                        <span className="form-drop__logo">
                                            <TokenIcons
                                                icons={[
                                                    {
                                                        icon: nativeCoin?.icon,
                                                        name: nativeCoin?.name,
                                                    },
                                                    {
                                                        address: token?.root,
                                                        icon: token?.icon,
                                                        name: token?.name,
                                                    },
                                                ]}
                                            />
                                        </span>
                                        <span className="form-drop__name">
                                            {`${nativeCoin?.symbol} + ${token?.symbol}`}
                                        </span>
                                        <span className="form-drop__arrow">
                                            <Icon icon="arrowDown" ratio={1.2} />
                                        </span>
                                    </Button>
                                )

                            case token !== undefined:
                            case nativeCoin !== undefined:
                                return (
                                    <Button
                                        key="change-token"
                                        btnStyles={classNames('form-drop form-drop-extra', {
                                            disabled: props.disabled,
                                        })}
                                        disabled={props.disabled}
                                        onClick={props.onToggleTokensList}
                                    >
                                        <span className="form-drop__logo">
                                            <TokenIcon
                                                address={token?.root}
                                                icon={nativeCoin?.icon || token?.icon}
                                                name={nativeCoin?.symbol || token?.symbol}
                                                size="small"
                                            />
                                        </span>
                                        <span className="form-drop__name">
                                            {nativeCoin?.symbol || token?.symbol}
                                        </span>
                                        <span className="form-drop__arrow">
                                            <Icon icon="arrowDown" ratio={1.2} />
                                        </span>
                                    </Button>
                                )

                            default:
                                return (
                                    <Button
                                        key="select-token"
                                        btnStyles={classNames('form-select', {
                                            disabled: props.disabled,
                                        })}
                                        disabled={props.disabled}
                                        onClick={props.onToggleTokensList}
                                    >
                                        <span className="form-select__txt">
                                            Select a token
                                        </span>
                                        <span className="form-select__arrow">
                                            <Icon icon="arrowDown" ratio={1.2} />
                                        </span>
                                    </Button>
                                )
                        }
                    })()}
                </div>

                <div className="form-fieldset__footer">
                    <div className="form-fieldset__footer-label">{props.label}</div>
                    <div className="form-fieldset__footer-inner">
                        {(
                            (token !== undefined || nativeCoin !== undefined)
                            && typeof props.onMaximize === 'function'
                            && showMaximizeButton
                        ) && (
                            <Button
                                key="max-button"
                                btnStyles="form-btn-max"
                                disabled={props.disabled}
                                size="xs"
                                type="link"
                                onClick={props.onMaximize}
                            >
                                Max
                            </Button>
                        )}
                        <div key="token-balance" className="swap-field-balance truncate">
                            {`Balance: ${balance}`}
                        </div>
                    </div>
                </div>
            </fieldset>
        </label>
    )
}


export const SwapField = observer(Field)
