import { API_URL } from "../../../constants";

import type {
    CrossSwapRoutePayloadRequest,
    CrossSwapRoutePayloadResponse,
    CrossSwapRouteRequest,
    CrossSwapRouteResponse,
    CrossSwapStatusRequest,
    CrossSwapStatusResponse,
} from '../types'
import { apiRoutes } from '../../../routes'
import { createHandler } from '../../../utils'

const api = {
    poolCrossSwapRoute: createHandler(apiRoutes.poolCrossSwapRoute, API_URL)<
        CrossSwapRouteResponse,
        CrossSwapRouteRequest
    >(),
    poolCrossSwapRoutePayload: createHandler(apiRoutes.poolCrossSwapRoutePayload, API_URL)<
        CrossSwapRoutePayloadResponse,
        CrossSwapRoutePayloadRequest
    >(),
    poolCrossSwapStatus: createHandler(apiRoutes.poolCrossSwapStatus, API_URL)<
        CrossSwapStatusResponse,
        CrossSwapStatusRequest
    >(),
}

export type SwapApi = typeof api

export function useSwapApi(): SwapApi {
    return api
}