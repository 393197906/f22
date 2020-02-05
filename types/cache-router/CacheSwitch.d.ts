import * as React from 'react';
import { CacheManager } from './CacheManager';
export interface CacheSwitchProps {
    maxRoutes?: number;
    cacheKeys: string[];
}
export declare function matchCache(path: string, cacheKeys: string[]): boolean;
export declare class CacheSwitch extends React.Component<CacheSwitchProps> {
    static defaultProps: {
        maxRoutes: number;
        cacheKeys: any[];
    };
    protected cacheManager: CacheManager;
    protected prevPath: string;
    constructor(props: CacheSwitchProps);
    render(): JSX.Element;
}
