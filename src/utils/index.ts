import { Address } from "everscale-inpage-provider";

export function resolveVenomAddress(address: Address | string): Address {
  return address instanceof Address ? address : new Address(address);
}

export function getSafeProcessingId(
  bits: 8 | 16 | 32 | 64 | 128 | 160 | 256 = 32
): string {
  // eslint-disable-next-line no-bitwise
  return Math.abs(~~(Math.random() * 2 ** bits) | 0).toString();
}

/**
 * Returns true if addresses are equals
 * @param {Address} [a]
 * @param {Address} [b]
 */
export function addressesComparer(a?: Address, b?: Address): boolean {
  return (
    a !== undefined &&
    a?.toString().toLowerCase() === b?.toString().toLowerCase()
  );
}

export function sliceAddress(address: string | undefined): string {
  return address ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "";
}

export * from "./console";
export * from "./debounce";
