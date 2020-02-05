import { Routers } from "../index";
export declare function assert(condition: boolean, err: Error): void;
export declare function mergePath(routers: Routers): Routers;
export declare function findDeep<V, C extends {
    [key: string]: any;
}, K extends keyof C>(value: V, values: C[], key?: K, childrenKey?: K, match?: (value: V, tValue: any) => boolean): [C, number[]];
export declare function isFunction(fun: any): fun is Function;
