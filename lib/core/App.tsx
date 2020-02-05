import React, {ReactElement, ReactNode, Suspense, useContext, useEffect} from "react";
import {
    HashRouter as ReactRouter,
    Route as ReactRoute,
    Switch,
    Redirect,
    Route,
    RouteComponentProps
} from "react-router-dom"
import {setRouterApiRouter, setCurrentRouterChildren} from "./routerApi"
import {Routers} from "../index";
import {LoadingComponent, LoadingContext} from "./index";

interface Props {
    routers: Routers,
}


export function renderRouter(routers: Routers, render?: (props: any) => any) {
    return routers.map((item, index) => {
        let Component: React.ComponentType<any>;
        if (!!item.asyncComponent) {
            Component = React.lazy(item.asyncComponent)
        } else if (!!item.component) {
            Component = item.component
        }
        const props = {
            exact: !!item.exact,
            path: item.path,
            key: index,
            render: (props: RouteComponentProps) => {
                const children = item.children ?? [];
                setRouterApiRouter(props);
                setCurrentRouterChildren(children)
                if (props.location.pathname === item.path && item.redirect) {
                    props.history.replace(item.redirect)
                }
                return (
                    <Component {...props}/>
                )
            }
        }
        if (render) return render(props)
        return (
            <ReactRoute {...props}/>
        )
    })
}

export function App(props: Props) {
    const loading = useContext<LoadingComponent>(LoadingContext) ?? null
    return (
        <Suspense fallback={loading as NonNullable<ReactNode> | null}>
            <ReactRouter>
                <Switch>
                    {
                        renderRouter(props.routers)
                    }
                </Switch>
            </ReactRouter>
        </Suspense>
    )
}
