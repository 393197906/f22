import React from "react";
import { Model, Models } from "../index";
export declare const StoreProvider: (props: React.ProviderProps<Models>) => JSX.Element;
export declare function useStore<T = any>(namespace: string): {
    state: T;
    dispatch: <T_1>(actionName: string, payload?: T_1) => void;
};
export declare function createModel<T>(model: Model<T>): Model<T>;
export declare class UseStoreError implements Error {
    message: string;
    name: string;
    constructor(message: string);
}
export declare class DispatchError implements Error {
    message: string;
    name: string;
    constructor(message: string);
}
