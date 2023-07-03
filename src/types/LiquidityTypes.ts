import type { Address } from '@andex/provider'
import type { 
    DexAccountDepositTokenCallbacks,
    DexAccountDepositTokenSuccessResult,
    DexAccountWithdrawTokenCallbacks,
    DexAccountWithdrawTokenSuccessResult,
    TransactionSuccessResult, 
} from "@andex/sdk"
import type {
    LiquidityPoolData,
    LiquidityPoolDepositCallbacks,
    LiquidityPoolDepositSuccessResult,
} from '../constants'

export type PoolData = LiquidityPoolData

export type CommonTokenTransactionReceipt = {
    amount?: string;
    hash?: string;
    receivedDecimals?: number;
    receivedIcon?: string;
    receivedRoot?: string;
    receivedSymbol?: string;
}

export type DepositTokenCallbacks = Pick<DexAccountDepositTokenCallbacks, 'onSend' | 'onTransactionFailure'> & {
    onTransactionSuccess?: (
        result: TransactionSuccessResult<DexAccountDepositTokenSuccessResult>,
        receipt?: CommonTokenTransactionReceipt
    ) => Promise<void> | void;
}

export type DepositLiquidityCallbacks = Pick<LiquidityPoolDepositCallbacks, 'onSend' | 'onTransactionFailure'> & {
    onTransactionSuccess?: (
        result: TransactionSuccessResult<LiquidityPoolDepositSuccessResult>,
        receipt?: CommonTokenTransactionReceipt & { poolAddress?: Address }
    ) => Promise<void> | void;
}

export type WithdrawTokenCallbacks = Pick<DexAccountWithdrawTokenCallbacks, 'onSend' | 'onTransactionFailure'> & {
    onTransactionSuccess?: (
        result: TransactionSuccessResult<DexAccountWithdrawTokenSuccessResult>,
        receipt?: CommonTokenTransactionReceipt
    ) => Promise<void> | void;
}


