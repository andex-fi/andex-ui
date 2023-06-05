import { generatePath } from "react-router-dom";

export type Params = Record<string, string>

export type URLTokensParams = {
    leftTokenRoot?: string;
    rightTokenRoot?: string;
}

export type URLAddressParam = {
    address: string;
}

export class Route<P extends Params> {

    readonly path: string

    constructor(path: string) {
        this.path = path
    }

    makeUrl(params?: P): string {
        return generatePath(this.path, params)
    }

}

export const appRoutes = {
    home: new Route('/'),
    liquidityRemove: new Route<URLTokensParams>('/liquidity/remove/:leftTokenRoot([0][:][0-9a-f]{64})?/:rightTokenRoot([0][:][0-9a-f]{64})?')
}