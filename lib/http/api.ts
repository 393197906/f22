import axios, {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {ApiRequest, ApiResponse} from "../index";
import {F22} from "../index";


export enum MethodEnum {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT"
}

export function requestHook<T>(config: AxiosRequestConfig, apiRequestConfig: ApiRequest<T>): AxiosRequestConfig {
    return config
}

export function responseHook<D>(data: AxiosResponse<D>) {
    return data.data
}

export function responseErrorHook(error: Error) {
    throw  error
}


export function fetch<R = any>(api: ApiRequest): Promise<ApiResponse<R>> {
    let config: AxiosRequestConfig = {
        baseURL: api.baseUrl ? api.baseUrl : F22.getInstance().getHttpConfig().baseUrl,
        method: generateMethod(api.method),
        url: api.url
    };
    // 方法设置
    api.method === MethodEnum.GET ? config.params = api.request : config.data = api.request
    return axios.request(F22.getInstance().getHttpConfig().requestHook(config, api))
        .then((data: AxiosResponse) => F22.getInstance().getHttpConfig().responseHook(data) as R)
        .then((data: R) => ({
            ...api,
            response: data
        }))
        .catch(error => {
            F22.getInstance().getHttpConfig().responseErrorHook(error)
            return {
                ...api,
                response: {} as R,
                error
            }
        })
}

function generateMethod(method: MethodEnum): Method {
    switch (method) {
        case MethodEnum.GET:
            return "get";
        case MethodEnum.POST:
            return "post";
        case MethodEnum.DELETE:
            return "delete";
        case MethodEnum.PUT:
            return "put";
    }
}


