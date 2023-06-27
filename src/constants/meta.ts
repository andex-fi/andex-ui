import { PageMeta } from "./types";

export const DEFAULT_META: PageMeta = {
    title: 'Andex Protocol',
    description: 'Swap or provide liquidity on Andex. The first incentivized DEX on Venom',
    image: 'https://andex.finance/images/favicon.png',
}

export const getCustomMeta = (path: string): PageMeta => {
    let basePath
    if(path.startsWith('/swap')) {
        basePath = '/swap'
    } else if (path.startsWith('/add')) {
        basePath = '/add'
    } else if (path.startsWith('/remove')) {
        basePath = '/remove'
    } else {
        basePath = path
    }

    switch (basePath) {
        case '/':
            return {
                title: `${'Home'} | ${'Andex'}`,
            }
        case '/swap':
            return {
                title: `${'Swap'} | ${'Andex'}`,
            }
        case '/add':
            return {
                title: `${'Add Liquidity'} | ${'Andex'}`,
            }
        case '/remove':
            return {
                title: `${'Remove Liquidity'} | ${'Andex'}`,
            }
        case '/liquidity':
            return {
                title: `${'Liquidity'} | ${'Andex'}`,
            }
        case '/import':
            return {
                title: `${'Import Pool'} | ${'Andex'}`,
            }
        case '/farms':
            return {
                title: `${'Farms'} | ${'Andex'}`,
            }
        case '/pools':
            return {
                title: `${'Pools'} | ${'Andex'}`,
            }
        default:
            return {
                title: `${'Andex Protocol'}`
            }
    }
}