import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiRequest, ApiResponse } from "../index";
export declare enum MethodEnum {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}
export declare function requestHook<T>(config: AxiosRequestConfig, apiRequestConfig: ApiRequest<T>): AxiosRequestConfig;
export declare function responseHook<D>(data: AxiosResponse<D>): D;
export declare function responseErrorHook(error: Error): void;
export declare function fetch<R = any>(api: ApiRequest): Promise<ApiResponse<R>>;
