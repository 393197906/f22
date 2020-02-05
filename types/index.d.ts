import React from "react";
import { RouteComponentProps } from "react-router";
import { MethodEnum } from "./http/api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
declare const _default: {
    name: string;
};
export default _default;
export { F22 } from "./core/index";
export { Navigation } from "./core/routerApi";
export { NavLink } from "react-router-dom";
export { default as NavigationView } from "./core/NavigationView";
interface RouterComponentFactory {
    (): Promise<{
        default: any;
    }>;
}
export interface Router {
    name?: string;
    path?: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    asyncComponent?: RouterComponentFactory;
    children?: Routers;
    exact?: boolean;
    redirect?: string;
}
export declare type Routers = Router[];
export { withRouter } from "react-router-dom";
export { MethodEnum } from "./http/api";
export interface HttpConfig {
    readonly baseUrl: string;
    readonly responseErrorHook: (error: Error) => void;
    readonly responseHook: <D>(data: AxiosResponse<D>) => any;
    readonly requestHook: <T>(config: AxiosRequestConfig, apiRequestConfig: ApiRequest<T>) => AxiosRequestConfig;
}
export declare type HttpOptions = {
    [p in keyof HttpConfig]?: HttpConfig[p];
};
export interface Api {
    url: string;
    method: MethodEnum;
}
export interface ApiRequest<R = any> extends Api {
    baseUrl?: string;
    notLoading?: boolean;
    request?: R;
}
export interface ApiResponse<R = any> extends Api {
    response: R;
    error?: Error;
}
export interface ApResultResponse<T = any> {
    code?: number;
    msg?: string;
    data: T;
    result: T;
}
export { fetch } from "./http/api";
export { useCreate, useApi, useDestroy, useCurrentRoute, useActivate, useDeactivated } from "./hook/hook";
export { findDeep } from "./core/utils";
export { createModel, useStore } from "./store/index";
export interface Reducer<T, K = any> {
    (state: T, payload: K): T;
}
export interface Reducers<T> {
    [key: string]: Reducer<T>;
}
export interface Model<T = any> {
    state: T;
    reducers: Reducers<T>;
}
export interface Models {
    [key: string]: Model;
}
export interface Action<T = any> {
    type: string;
    payload?: T;
}
