import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App"
import {Routers, Models, HttpConfig, HttpOptions} from "../index"
import {mergePath} from "./utils"
import {setCompleteRouterConfig} from "./routerApi";
import {StoreProvider} from '../store/index';
import {responseErrorHook, responseHook, requestHook} from "../http/api"

interface Render {
    (): ReactElement
}

type ProviderHandler = ((render: Render) => ReactElement) | undefined
export type LoadingComponent = ReactElement | undefined

export class F22 {
    private _routers: Routers = [];
    private _providerHandler: ProviderHandler = undefined;
    private _loadingComponent: LoadingComponent;
    private _models: Models = {}
    private _httpConfig: HttpConfig = {
        baseUrl: "",
        responseHook: responseHook,
        responseErrorHook: responseErrorHook,
        requestHook: requestHook
    };
    private static _instance: F22;

    private constructor() {
    }

    static getInstance(): F22 {
        if (!this._instance) {
            return this._instance = new F22();
        }
        return this._instance;
    }

    public useHttp(httpConfig: HttpOptions) {
        this._httpConfig = {
            ...this._httpConfig,
            ...httpConfig
        };
        return this;
    }

    public getHttpConfig(): HttpConfig {
        return this._httpConfig
    }

    public useLoading(loading: ReactElement) {
        this._loadingComponent = loading
        return this;
    }

    public useRouter(routers: Routers = []) {
        this._routers = mergePath(routers);
        setCompleteRouterConfig(this._routers)
        return this;
    }

    public useStore(models: Models) {
        this._models = models;
        return this;
    }

    public useProviderHandler(providerHandler: ProviderHandler) {
        this._providerHandler = providerHandler;
        return this;
    }

    public run(el?: HTMLElement | string) {
        let $el: Element | null;
        if (typeof (el) == 'string') {
            $el = document.querySelector<Element>(el);
        } else if (el === undefined) {
            $el = document.querySelector<Element>("#root")
        } else {
            $el = el
        }
        if (!$el) {
            console.error("没有找到挂载节点");
        }
        ReactDOM.render(
            <Base
                routers={this._routers}
                loadingComponent={this._loadingComponent}
                providerHandler={this._providerHandler}
                models={this._models}
            />,
            $el
        );
    }
}


interface Props {
    routers: Routers,
    providerHandler: ProviderHandler,
    loadingComponent: LoadingComponent,
    models: Models
}

export const LoadingContext = React.createContext<LoadingComponent>(undefined);

function Base({routers, models, loadingComponent, providerHandler}: Props) {
    const render = () => {
        return (
            <StoreProvider value={models}>
                <LoadingContext.Provider value={loadingComponent}>
                    <App routers={routers}/>
                </LoadingContext.Provider>
            </StoreProvider>
        )
    };

    if (providerHandler) {
        return providerHandler(render)
    }
    return render();
}



