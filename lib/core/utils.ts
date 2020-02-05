import {Routers} from "../index";
import {RouterConfigError} from "./exception"
import {matchPath} from "react-router-dom"

export function assert(condition: boolean, err: Error) {
    if (!condition) {
        throw err;
    }
}

// merge router path
export function mergePath(routers: Routers): Routers {
    return (function di(items, prePath: string = ""): Routers {
        return items.map((item) => {
            if (!!item.path) {
                assert(item.path.startsWith("/", 0), new RouterConfigError(`${item.path} 路由 必须以‘/’开头`))
            }
            let path = `${prePath}${item.path}`
            path = path.replace(/\/\//, "/")
            const children = item.children || []
            return {...item, path, children: di(children, path)}
        })
    })(routers, "")
}

// 深查找
export function findDeep<V,
    C extends { [key: string]: any },
    K extends keyof C>(
    value: V,
    values: C[],
    key: K = "path" as K,
    childrenKey: K = "children" as K,
    match: (value: V, tValue: any) => boolean = (value: V, values: any) => false
): [C, number[]] {
    let target: C;
    let paths: number[] = []
    const di = (items: C[], index: number) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i][key] === value || match(value, items[i][key])) {
                target = items[i];
                const pathr = [i];
                if (index !== -1) pathr.unshift(index)
                paths = [...paths, ...pathr]
                break;
            }
            di(items[i][childrenKey] ?? [], i)
        }
    };
    di(values, -1);
    // @ts-ignore
    return [target, paths];
}

// 是不是函数
export function isFunction(fun: any): fun is Function {
    return typeof fun === "function";
}

