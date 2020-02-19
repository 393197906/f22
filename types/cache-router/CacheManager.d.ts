interface CacheMap {
    [path: string]: any;
}
export declare class CacheManager {
    private cache;
    private localCache;
    private cacheKeys;
    private maxCache;
    constructor(maxCache?: number);
    get caches(): CacheMap;
    add(path: string, data: any, local?: boolean): void;
    get(path: string): any;
    delete(path: string): void;
    clear(clearLocalCache?: boolean): void;
    focus(path: string): void;
}
export {};
