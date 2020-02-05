import {ApiRequest, ApiResponse, MethodEnum, Navigation, Router, Routers} from "../index";
import {useEffect, useState} from "react";
import {fetch} from "../http/api";
import {findDeep} from "../core/utils";
import {matchPath} from "react-router-dom"
import PubSub from "pubsub-js"

// axios.interceptors.response.use(function (response) {
//     return response.data;
// }, function (error) {
//     return Promise.reject(error);
// });


export function useApi<R = any>(api: ApiRequest): [() => Promise<ApiResponse<R>>, boolean] {
    const [loading, setLoading] = useState<boolean>(false);
    const load = () => {
        setLoading(true);
        return fetch<R>(api)
            .finally(() => setLoading(false))
    };
    return [load, loading]
}

export function useCreate(create: () => void | undefined) {
    useEffect(() => create(), [])
}

export function useDestroy(destroy: () => void | undefined) {
    useEffect(() => () => destroy(), [])
}

// 路由缓存激活钩子
export function useActivate(callback: () => void | undefined) {
    useEffect(() => {
        const path = Navigation.location().pathname ?? "";
        const token = PubSub.subscribe("activate" + path, callback)
        return () => PubSub.unsubscribe(token);
    }, [])
}

// 路由缓存失激钩子
export function useDeactivated(callback: () => void | undefined) {
    useEffect(() => {
        const path = Navigation.location().pathname ?? "";
        const token = PubSub.subscribe("deactivated" + path, callback)
        return () => PubSub.unsubscribe(token);
    }, [])
}


// 当前router
export function useCurrentRoute(): Router | undefined {
    const [router, setRouter] = useState<Router>();
    useEffect(() => {
        const routerConfig = Navigation.routerConfig();
        const path = Navigation.location().pathname ?? ""
        const targetRouter = findDeep(path, routerConfig, "path", "children", (value, tValue) => {
            if (tValue.search("/:") > -1) {
                return !!matchPath(value, {
                    path: tValue,
                })
            }
            return false
        })[0]
        let router;
        if (targetRouter) {
            router = {...targetRouter, path}
        }
        setRouter(router)
    }, [Navigation.location().pathname]);
    return router
}










