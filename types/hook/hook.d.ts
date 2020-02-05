import { ApiRequest, ApiResponse, Router } from "../index";
export declare function useApi<R = any>(api: ApiRequest): [() => Promise<ApiResponse<R>>, boolean];
export declare function useCreate(create: () => void | undefined): void;
export declare function useDestroy(destroy: () => void | undefined): void;
export declare function useActivate(callback: () => void | undefined): void;
export declare function useDeactivated(callback: () => void | undefined): void;
export declare function useCurrentRoute(): Router | undefined;
