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