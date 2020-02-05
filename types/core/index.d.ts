import React, { ReactElement } from 'react';
import { Routers, Models, HttpConfig, HttpOptions } from "../index";
interface Render {
    (): ReactElement;
}
declare type ProviderHandler = ((render: Render) => ReactElement) | undefined;
export declare type LoadingComponent = ReactElement | undefined;
export declare class F22 {
    private _routers;
    private _providerHandler;
    private _loadingComponent;
    private _models;
    private _httpConfig;
    private static _instance;
    private constructor();
    static getInstance(): F22;
    useHttp(httpConfig: HttpOptions): this;
    getHttpConfig(): HttpConfig;
    useLoading(loading: ReactElement): this;
    useRouter(routers?: Routers): this;
    useStore(models: Models): this;
    useProviderHandler(providerHandler: ProviderHandler): this;
    run(el?: HTMLElement | string): void;
}
export declare const LoadingContext: React.Context<React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>>;
export {};
