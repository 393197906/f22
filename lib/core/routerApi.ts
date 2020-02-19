import {RouteComponentProps} from "react-router-dom";
import {Routers} from "../index";
import * as H from "history";


let _routerApiRouter: RouteComponentProps;  // router props
let _currentRouterChildren: Routers = [] // 子路由
let _completeRouterConfig: Routers = [] // 完整配置

export function setCompleteRouterConfig(completeRouterConfig: Routers) {
    _completeRouterConfig = completeRouterConfig
}

export function getCurrentRouterChildren(): Routers {
    return _currentRouterChildren
}

export function setCurrentRouterChildren(children: Routers) {
    _currentRouterChildren = children
}

export function setRouterApiRouter(routerApiRouter: RouteComponentProps) {
    _routerApiRouter = routerApiRouter
}

export class Navigation {

    static routerConfig(): Routers {
        return _completeRouterConfig
    }

    static location(): H.Location {
        return _routerApiRouter.location
    }


    static params<T = any>() {
        return _routerApiRouter.match?.params as T
    }


    static push(path: string) {
        return _routerApiRouter.history.push(path)
    }

    static replace(path: string) {
        return _routerApiRouter.history.push(path)
    }

    static go(num: number) {
        return _routerApiRouter.history.go(num)
    }

    static back() {
        return _routerApiRouter.history.goBack()
    }

}
