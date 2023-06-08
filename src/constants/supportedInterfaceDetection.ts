/* eslint-disable react-hooks/rules-of-hooks */
import { Address, FullContractState } from '@andex/provider'

import { useStaticRpc } from '../hooks'
import { error, resolveVenomAddress, sliceAddress } from '../utils'


const staticRpc = useStaticRpc()

export type SupportsParams = {
    address: Address | string;
    interfaces: number[];
}

export class SupportedInterfaceDetection {

    static ABI = {
        events: [],
        functions: [
            {
                inputs: [
                    {
                        name: 'answerId',
                        type: 'uint32',
                    },
                    {
                        name: 'id',
                        type: 'uint32',
                    },
                ],
                name: 'supportsInterface',
                outputs: [
                    {
                        name: 'supports',
                        type: 'bool',
                    },
                ],
            },
        ],
        version: '2.2',
    } as const

    public static async supports(params: SupportsParams, state?: FullContractState): Promise<boolean> {
        const { address, interfaces } = params

        // eslint-disable-next-line no-restricted-syntax
        for (const id of interfaces) {
            try {
                const { supports } = await new staticRpc.Contract(
                    SupportedInterfaceDetection.ABI,
                    resolveVenomAddress(address),
                ).methods.supportsInterface({
                    answerId: 0,
                    id,
                }).call({ cachedState: state, responsible: true })

                if (!supports) {
                    return false
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch (e: any) {
                error(`Token ${sliceAddress(address.toString())} does not support TIP3.1 interface`, e)
                return false
            }
        }
        return true
    }

}
