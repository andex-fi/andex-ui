import { Address } from "everscale-inpage-provider";
import BigNumber from "bignumber.js";


export function isGoodBignumber(value: BigNumber | number | string, nonZeroCheck = true): boolean {
    const valueBN = value instanceof BigNumber ? value : new BigNumber(value)

    return (
        valueBN.isFinite()
        && !valueBN.isNaN()
        && valueBN.isPositive()
        && (nonZeroCheck ? !valueBN.isZero() : true)
    )
}

export function resolveVenomAddress(address: Address | string): Address {
    return address instanceof Address ? address : new Address(address)
}

export function sliceAddress(address: string | undefined): string {
    return address ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : ''
}

export function truncateDecimals(value: string, decimals?: number): string | undefined {
    const result = new BigNumber(value || 0)

    if (!isGoodBignumber(result)) {
        return value
    }

    if (decimals !== undefined && (result.decimalPlaces() ?? 0) > decimals) {
        return result.dp(decimals, BigNumber.ROUND_DOWN).toFixed()
    }

    return result.toFixed()
}

export function tuple<T extends string[]>(...args: T): T {
    return args
}

export function uniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function validateMaxValue(maxValue?: string, value?: string, decimals?: number): boolean {
    if (!maxValue) {
        return true
    }

    const maxValueBN = new BigNumber(maxValue || 0)
    if (!isGoodBignumber(maxValueBN)) {
        return false
    }

    let valueBN = new BigNumber(value || 0)
    if (decimals !== undefined) {
        valueBN = valueBN.shiftedBy(decimals)
    }

    return valueBN.lte(maxValueBN)
}

export function validateMinValue(minValue?: string, value?: string, decimals?: number): boolean {
    if (!minValue) {
        return true
    }

    const minValueBN = new BigNumber(minValue || 0)
    if (!isGoodBignumber(minValueBN, false)) {
        return false
    }

    let valueBN = new BigNumber(value || 0)
    if (decimals !== undefined) {
        valueBN = valueBN.shiftedBy(decimals)
    }

    return valueBN.gte(minValueBN)
}

export function zip<A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> {
    return a.map((e, i) => [e, b[i]])
}


export * from './console'
export * from './debounce'