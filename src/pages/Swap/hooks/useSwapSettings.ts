/* eslint-disable react-hooks/exhaustive-deps */
import BigNumber from 'bignumber.js'
import * as React from 'react'

import { DEFAULT_SLIPPAGE_VALUE } from '../constants'
import { useSwapFormStoreContext } from '../context'
import { debounce, isGoodBignumber } from '../../../utils'


type SwapSettingsShape = {
    popupRef: React.RefObject<HTMLDivElement>;
    triggerRef: React.RefObject<HTMLButtonElement>;
    isOpen: boolean;
    show: () => void;
    hide: () => void;
    handleOuterClick: (event: MouseEvent | TouchEvent) => void;
    onBlur: React.FormEventHandler<HTMLInputElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}


export function useSwapSettings(): SwapSettingsShape {
    const formStore = useSwapFormStoreContext()

    const popupRef = React.useRef<HTMLDivElement>(null)

    const triggerRef = React.useRef<HTMLButtonElement>(null)

    const [isOpen, setOpen] = React.useState(false)

    const show = () => {
        if (formStore.isProcessing) {
            return
        }
        setOpen(true)
    }

    const hide = () => {
        setOpen(false)
    }

    const handleOuterClick = (event: MouseEvent | TouchEvent) => {
        if (
            !popupRef.current?.contains(event.target as Node)
            && !triggerRef.current?.contains(event.target as Node)
            && (event.target as Node)?.parentNode
        ) {
            hide()
        }
    }

    const onBlur: React.FormEventHandler<HTMLInputElement> = event => {
        const value = new BigNumber(event.currentTarget.value || 0)
        if (!isGoodBignumber(value)) {
            formStore.setData('slippage', DEFAULT_SLIPPAGE_VALUE)
        }
    }

    const onKeyPress = React.useCallback(debounce(async () => {
        await formStore.recalculate(true)
        formStore.setState('isCalculating', false)
    }, 1000), [formStore.isCalculating])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
        let { value } = event.target
        value = value.replace(/[,]/g, '.')
        if (
            formStore.slippage
            && formStore.slippage.indexOf('.') > -1
            && value.length > formStore.slippage.length
            && value.charAt(value.length - 1) === '.'
        ) {
            return
        }
        value = value.replace(/[.]+/g, '.')
        value = value.replace(/(?!- )[^0-9.]/g, '')
        await formStore.changeSlippage(value)
        await onKeyPress()
    }

    React.useEffect(() => {
        document.addEventListener('click', handleOuterClick, false)
        document.addEventListener('touchend', handleOuterClick, false)

        return () => {
            document.removeEventListener('click', handleOuterClick, false)
            document.removeEventListener('touchend', handleOuterClick, false)
        }
    }, [])

    return {
        handleOuterClick,
        hide,
        isOpen,
        popupRef,
        show,
        triggerRef,
        // eslint-disable-next-line sort-keys
        onBlur,
        onChange,
    }
}
