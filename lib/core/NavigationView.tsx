import React, {ReactNode, Suspense, useContext, useEffect, useRef, useState} from "react";
import {getCurrentRouterChildren} from "./routerApi"
import {renderRouter} from "./App"
import {LoadingComponent, LoadingContext} from "./index";
import {CacheRoute, CacheSwitch} from "../cache-router/index"
import {Switch, Route} from "react-router-dom"

interface Props {
    cacheKeys?: string[]
}

export default React.memo((props: Props) => {
    const loading = useContext<LoadingComponent>(LoadingContext) ?? null
    const [children] = useState(getCurrentRouterChildren())
    const SWITCH = props.cacheKeys ? CacheSwitch : Switch;
    const ROUTER = props.cacheKeys ? CacheRoute : Route;
    return (
        <Suspense fallback={loading as NonNullable<ReactNode> | null}>
            <SWITCH cacheKeys={props.cacheKeys ?? []}>
                {
                    renderRouter(children, props => {
                        return <ROUTER {...props}/>
                    })
                }
            </SWITCH>
        </Suspense>
    )
})
