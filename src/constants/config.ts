import { AddressLiteral, Address } from "@andex/provider";

export const WrapGas = '1000000000' // <= 1 VENOM

export const SafeAmount = '10000000000' // <= 10 VENOM

export const DexRootAddress = new AddressLiteral('0:e1acd1e93ebff4892ebe37c411f524035ef5f096ff8b869a0c47d044dad34d22')
export const TokenFactoryAddress = new AddressLiteral('0:213d1bc1e0308b76c27c0136d6e3e1307f29d3cdff97e92b82bd0ba9ad8e2ffc')
export const VenomToTip3Address = new AddressLiteral('0:e79ececf54b024867290a764173ba85280e6fe76dc6cbaeb5a0b01ab67012afb')
export const Tip3ToVenomAddress = new AddressLiteral('0:f4e99253c9d1b322098c2a37ac40be0f1b02bdce012da6129e6f6a75690415ba')
export const VenomWvenomToTip3Address = new AddressLiteral('0:cfc4192b02e9684d7a6f10e9dd9c8922baf8bcd73392e7840ae20800e8d0ee1c')
export const WVenomVaultAddress = new AddressLiteral('0:3b9739d1c977562c84399cb02cd52bc9d5aa274dd578f85e20de8f9724768e5c')
export const WVENOMRootAddress = new AddressLiteral('0:caf849eea43d916944844ea0c4dc0bde7588ade07d81cad890dcd85bd4969ebc')

export const TokenListURI = 'https://raw.githubusercontent.com/andex-fi/token-lists/master/manifest.json'

export const MinWalletVersion = '0.2.31'

export const API_URL = 'https://api.andex.finance'

export const NPoolsList = new Map<
    string,
    { poolAddress: Address, roots: { address: Address }[] }
>([
    ['0:155dfc30972a91b1737a3c75f8077f6d4f6c871753c1866407efaf43c3687723', {
        poolAddress: new AddressLiteral('0:71bbd09511797ba170911677f9300633a1143472c279b5b1bd6bd46cb666f929'),
        roots: [
            { address: new AddressLiteral('0:2d963fb029bf321d25c207f7c786dffa030387106861a9912b2d5e1cd90590ea') },
            { address: new AddressLiteral('0:84f7dc464665ee5be3c0e4065afa509041eaa9cded1308cdd29560dd630cdbf7') },
            { address: new AddressLiteral('0:b8b76afb475cbd64786d2c693fe8b182797c4b47194fa5f25749ee673e478b06') },
        ],
    }],
])