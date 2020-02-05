import { RouteComponentProps } from "react-router-dom";
import { Routers } from "../index";
import * as H from "history";
export declare function setCompleteRouterConfig(completeRouterConfig: Routers): void;
export declare function getCurrentRouterChildren(): Routers;
export declare function setCurrentRouterChildren(children: Routers): void;
export declare function setRouterApiRouter(routerApiRouter: RouteComponentProps): void;
export declare class Navigation {
    static routerConfig(): Routers;
    static location(): H.Location;
    static params<T = any>(): T;
    static push(path: string): void;
    static replace(path: string): void;
    static go(num: number): void;
    static back(): void;
}
