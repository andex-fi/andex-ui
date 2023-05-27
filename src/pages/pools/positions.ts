import ImageOne from '../../assets/img1.png'
import ImageTwo from '../../assets/img2.png'

interface position {
    name: string;
    percentage?:string;
    min: string;
    max: string;
    status: "In range" | "Closed";
    img?: string;
}

export const Positions: position[] = [
    {
        name: "USDC/ETH",
        percentage: "0.3%",
        min: "1504.2 USDC per ETH",
        max: "3505.2 ETH per USDC",
        status: "In range",
        img: ImageOne
    },
    {
        name: "USDC/DAI",
        percentage: "0.3%",
        min: "1504.2 USDC per DAI",
        max: "3505.2 DAI per USDC",
        status: "Closed",
        img: ImageTwo
    },
]

interface pool {
    name: string;
    tvl: string;
    vol24h: string;
    vol7d: string;
    img: string;
    percentage?:string;
}

export const Pools: pool[] = [
    {
        name: "USDC/ETH",
        tvl: "$12.54m",
        vol24h: "$540.98m",
        vol7d: "$98.15b",
        img: ImageOne,
        percentage: "0.3%"
    },
    {
        name: "USDC/DAI",
        tvl: "$12.54m",
        vol24h: "$540.98m",
        vol7d: "$98.15b",
        img: ImageTwo
    },
   
]