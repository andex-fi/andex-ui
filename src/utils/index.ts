import { Address } from "everscale-inpage-provider";

export function resolveVenomAddress(address: Address | string): Address {
    return address instanceof Address ? address : new Address(address)
}

export * from './console'
export * from './debounce'