import React, {ReactElement, ReactNode, ProviderProps, useReducer, Dispatch, useContext} from "react";
import {Action, Model, Models, Reducer} from "../index"
import {assert} from "../core/utils";

const tag = "@"

// const storeSymbol = Symbol("storeSymbol");
interface Context<T = any> {
    models?: Models,
    dispatch?: Dispatch<T>
}

const StoreContext = React.createContext<Context>({});

export const StoreProvider = (props: ProviderProps<Models>) => {
    const reducer = splitReducerAndState(props.value)
    const [models, dispatch] = useReducer(reducer, props.value)
    return <StoreContext.Provider value={{
        models,
        dispatch
    }}>
        {
            props.children
        }
    </StoreContext.Provider>
};

function splitReducerAndState(models: Models) {
    const actionMap = new Map<string, Reducer<any>>();
    Object.keys(models).forEach(key => {
        const {reducers} = models[key];
        Object.keys(reducers).forEach(reducerKey => {
            actionMap.set(`${key}${tag}${reducerKey}`, reducers[reducerKey])
        })
    });
    const reducer: (state: Models, action: Action) => Models = (state: Models, action: Action) => {
        const paths = action.type.split(tag);
        const namespace = paths[0] ?? ""
        return {
            ...state,
            [namespace]: {
                ...state[namespace],
                state: Reflect.apply(actionMap.get(action.type) as Function, null, [state[namespace].state, action.payload])
            }
        };
    };
    return reducer
}


// store
export function useStore<T = any>(namespace: string) {
    assert(!!namespace, new UseStoreError("请传入namespace"))
    const {models, dispatch} = useContext<Context>(StoreContext);
    const state = models?.[namespace].state as T;
    const dispatchHandler: <T>(actionName: string, payload?: T) => void = (actionName: string, payload) => {
        assert(!!actionName, new DispatchError("请传入actionName"))
        const action: Action = {
            type: `${namespace}${tag}${actionName}`,
            payload
        };
        dispatch?.(action)
    };
    return {state, dispatch: dispatchHandler}
}

export function createModel<T>(model: Model<T>) {
    return model
}

export class UseStoreError implements Error {
    name: string = "UseStoreError";

    constructor(public message: string) {

    }
}

export class DispatchError implements Error {
    name: string = "DispatchError";

    constructor(public message: string) {

    }
}







