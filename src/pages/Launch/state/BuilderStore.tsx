/* eslint-disable react-hooks/rules-of-hooks */
import {
    action,
    IReactionDisposer,
    makeAutoObservable,
    reaction,
} from 'mobx'

import { isAddressValid, Token, TokenWallet } from '../../../constants'
import {
    BuilderStoreData,
    BuilderStoreState,
} from '../types'
import { DEFAULT_BUILDER_STORE_DATA, DEFAULT_BUILDER_STORE_STATE } from '../constants'
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from '../utils'
import { useWallet, WalletService } from '../../../state/WalletService'

const service = useWallet();


export class BuilderStore {

    /**
     * Current data of the builder
     * @type {BuilderStoreData}
     * @protected
     */
    protected data: BuilderStoreData = DEFAULT_BUILDER_STORE_DATA

    /**
     * Current state of the builder store
     * @type {BuilderStoreState}
     * @protected
     */
    protected state: BuilderStoreState = DEFAULT_BUILDER_STORE_STATE

    /**
     *
     * @param wallet {WalletService}
     */
    constructor(protected readonly wallet: WalletService = service) {
        makeAutoObservable<BuilderStore, 'handleWalletAddressChange'>(this, {
            handleWalletAddressChange: action.bound,
        })
    }

    /**
     * Manually change store data by the given key
     * @template K
     * @param {K} key
     * @param {BuilderStoreData[k]} value
     */
    public changeData<K extends keyof BuilderStoreData>(key: K, value: BuilderStoreData[K]): void {
        this.data[key] = value
    }

    protected changeState<K extends keyof BuilderStoreState>(key: K, value: BuilderStoreState[K]): void {
        this.state[key] = value
    }

    public async init(): Promise<void> {
        this.#walletAccountDisposer = reaction(() => this.wallet.address, this.handleWalletAddressChange)

        if (this.wallet.address != null) {
            await this.handleWalletAddressChange()
        }
    }

    /**
     * Manually dispose all of the internal subscribers.
     * Clean reset builder `data` to default values.
     */
    public dispose(): void {
        this.#walletAccountDisposer?.()
        this.reset()
    }

    public async filterTokens(): Promise<void> {
        try {
            this.changeState('isLoading', true)

            if (this.data.filter === '') {
                const tokens = await this.loadTokensData()
                this.changeData('tokens', tokens)
                return
            }

            const token = await TokenWallet.getTokenFullDetails(this.data.filter)

            if (token && token.rootOwnerAddress?.toString() === this.wallet.address) {
                if (
                    !getTokenFromLocalStorage().some(
                        (tokenFromLS: string) => tokenFromLS === this.data.filter,
                    )
                ) {
                    saveTokenToLocalStorage(this.data.filter)
                }

                this.changeData('tokens', [
                    {
                        ...token,
                        name: token.name,
                        symbol: token.symbol,
                    },
                ])
            }
            else {
                this.changeData('tokens', [])
            }
        }
        catch (e) {
            this.changeData('tokens', [])
        }
        finally {
            this.changeState('isLoading', false)
        }
    }

    protected async handleWalletAddressChange(walletAddress?: string, prevWalletAddress?: string): Promise<void> {
        if (!walletAddress || walletAddress !== prevWalletAddress) {
            this.reset()
        }

        try {
            const tokens = await this.loadTokensData()
            this.changeData('tokens', tokens)
        }
        catch (e) { /* empty */ }
    }

    /**
     * Loads tokens data from localStorage
     * @protected
     */
    protected async loadTokensData(): Promise<Token[]> {
        const tokenRoots: string[] = getTokenFromLocalStorage().filter(
            (token: string) => isAddressValid(token),
        )

        this.changeState('isLoading', true)

        let tokens: Token[] = []

        try {
            const result = await Promise.all(tokenRoots.map(tokenRoot => TokenWallet.getTokenFullDetails(tokenRoot)))
            tokens = (result.filter((token, idx) => {
                const _token = { ...token, root: tokenRoots[idx] }
                return (
                    Object.keys({ ..._token }).length > 1
                    && _token?.root !== undefined
                    && _token.rootOwnerAddress?.toString() === this.wallet.address
                )
            }) as Token[]).map(token => ({
                ...token,
                name: token.name,
                symbol: token.symbol,
            }))
        }
        catch (e) { /* empty */ }
        finally {
            this.changeState('isLoading', false)
        }

        return tokens
    }

    /**
     *
     * @protected
     */
    protected reset(): void {
        this.resetData()
    }

    /**
     *
     * @protected
     */
    protected resetData(): void {
        this.data = DEFAULT_BUILDER_STORE_DATA
    }

    /**
     *
     * @protected
     */
    protected resetState(): void {
        this.state = DEFAULT_BUILDER_STORE_STATE
    }

    public get tokens(): Token[] {
        return this.data.tokens
    }

    public get filter(): string {
        return this.data.filter
    }

    public get isLoading(): boolean {
        return this.state.isLoading
    }

    /*
     * Internal reaction disposers
     * ----------------------------------------------------------------------------------
     */
    #walletAccountDisposer: IReactionDisposer | undefined

}


// eslint-disable-next-line react-refresh/only-export-components
const Builder = new BuilderStore()

export function useBuilderStore(): BuilderStore {
    return Builder
}
