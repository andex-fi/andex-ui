/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Address } from "@andex/provider";
import BigNumber from "bignumber.js";

export function isGoodBignumber(
  value: BigNumber | number | string,
  nonZeroCheck = true
): boolean {
  const valueBN = value instanceof BigNumber ? value : new BigNumber(value);

  return (
    valueBN.isFinite() &&
    !valueBN.isNaN() &&
    valueBN.isPositive() &&
    (nonZeroCheck ? !valueBN.isZero() : true)
  );
}

export function camelify(string: string): string {
  return string.replace(/[-_/](\w)/g, (_, str) =>
    str ? str.toUpperCase() : ""
  );
}

export function resolveVenomAddress(address: Address | string): Address {
  return address instanceof Address ? address : new Address(address);
}

export function throttle<T>(
  fn: (...args: T[]) => unknown,
  limit: number,
): (...args: T[]) => void {
  let wait = false

  return (...args: T[]) => {
      if (!wait) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fn.apply(this, args)

          wait = true

          setTimeout(() => {
              wait = false
          }, limit)
      }
  }
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

export function truncateDecimals(
  value: string,
  decimals?: number
): string | undefined {
  const result = new BigNumber(value || 0);

  if (!isGoodBignumber(result)) {
    return value;
  }

  if (decimals !== undefined && (result.decimalPlaces() ?? 0) > decimals) {
    return result.dp(decimals, BigNumber.ROUND_DOWN).toFixed();
  }

  return result.toFixed();
}

export function tuple<T extends string[]>(...args: T): T {
  return args;
}

export function uniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function validateMaxValue(
  maxValue?: string,
  value?: string,
  decimals?: number
): boolean {
  if (!maxValue) {
    return true;
  }

  const maxValueBN = new BigNumber(maxValue || 0);
  if (!isGoodBignumber(maxValueBN)) {
    return false;
  }

  let valueBN = new BigNumber(value || 0);
  if (decimals !== undefined) {
    valueBN = valueBN.shiftedBy(decimals);
  }

  return valueBN.lte(maxValueBN);
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<(?:.|\n)*?>/gm, '')
}

export function validateMinValue(
  minValue?: string,
  value?: string,
  decimals?: number
): boolean {
  if (!minValue) {
    return true;
  }

  const minValueBN = new BigNumber(minValue || 0);
  if (!isGoodBignumber(minValueBN, false)) {
    return false;
  }

  let valueBN = new BigNumber(value || 0);
  if (decimals !== undefined) {
    valueBN = valueBN.shiftedBy(decimals);
  }

  return valueBN.gte(minValueBN);
}

export const MOBILE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i

export const MOBILE_ALT = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i

export function isMobile(ua: string): boolean {
    const str = ua.toLowerCase()
    return MOBILE.test(str) || MOBILE_ALT.test(str.substring(0, 4))
}

export function zip<A, B>(a: Array<A>, b: Array<B>): Array<[A, B]> {
  return a.map((e, i) => [e, b[i]]);
}

export * from "./console";
export * from "./debounce";
export * from "./formattedAmount";
export * from "./formattedBalance";
export * from "./storage";
export * from "./formattedTokenAmount";
export * from "./makeArray";
export * from "./events";
