import * as React from 'react';
import {matchPath} from 'react-router-dom';
import {CacheManager} from './CacheManager';
import {CacheRouteProps} from "./CacheRoute";
import {RouteUpdater} from "./RouteUpdater";
import PubSub from "pubsub-js"

export interface CacheSwitchProps {
    maxRoutes?: number; // 最大缓存路由数量
    cacheKeys: string []
}

// 匹配缓存
export function matchCache(path: string, cacheKeys: string[]): boolean {
    return !!cacheKeys.find(item => item === path)
}

export class CacheSwitch extends React.Component<CacheSwitchProps> {
    static defaultProps = {
        maxRoutes: -1,
        cacheKeys: []
    };

    protected cacheManager: CacheManager;
    protected prevPath: string = "";

    constructor(props: CacheSwitchProps) {
        super(props);
        this.cacheManager = new CacheManager(props.maxRoutes);
    }

    render() {
        let {
            maxRoutes,
            children,
            cacheKeys
        } = this.props;

        let cacheManager = this.cacheManager;

        return <RouteUpdater deps={cacheKeys}>
            {({currentPath, prevPath}) => {
                return React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) {
                        return null;
                    }
                    let props = child.props as CacheRouteProps,
                        match = matchPath(currentPath, props);

                    if (match) {
                        this.prevPath = currentPath;
                        maxRoutes !== -1 && cacheManager.focus(currentPath);
                    }

                    let paths = props.path;
                    if (!Array.isArray(paths)) {
                        paths = [paths || ''];
                    }

                    let key = match ? this.prevPath : paths.join(',');
                    // @ts-ignore
                    if (child.type["displayName"] === "CacheRoute") {
                        const isCache = matchCache(key, cacheKeys);
                        if (!isCache) { // 如果没被缓存则清除缓存
                            cacheManager.delete(key)
                        }
                        let cacheRoute = cacheManager.get(key);
                        setTimeout(() => {   // 不阻塞线程
                            // 触发（激活）钩子
                            cacheRoute && match && PubSub.publish("activate" + key, null)
                            // 触发（失激钩子）
                            if (cacheRoute && !match && prevPath !== currentPath) {
                                PubSub.publish("deactivated" + prevPath, null)
                            }
                        })


                        // 未匹配或者cacheRoute存在时且开启了缓存时直接返回；
                        if (!match || cacheRoute) {
                            return cacheRoute;
                        }

                        cacheRoute = React.cloneElement(child, {
                            key: key || index,
                            ...props,
                            cache: isCache,
                        });

                        // 判断是否开启缓存
                        if (key && isCache) {
                            cacheManager.add(key, cacheRoute, props.local);
                        }
                        return cacheRoute;
                    } else {
                        return match ? React.cloneElement(child, {
                            key: key || index,
                            ...props
                        }) : null;
                    }
                });
            }}
                </RouteUpdater>;
                }
                }
