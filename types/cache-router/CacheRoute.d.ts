import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
export interface CacheRouteComponentProps extends RouteComponentProps {
}
export interface CacheRouteProps extends RouteProps {
    component?: React.ComponentType<CacheRouteComponentProps> | React.ComponentType<any>;
    render?: ((props: CacheRouteComponentProps) => React.ReactNode);
    children?: ((props: CacheRouteComponentProps) => React.ReactNode) | React.ReactNode;
    cache?: boolean;
    local?: boolean;
}
export declare class CacheRoute extends React.Component<CacheRouteProps> {
    static readonly displayName = "CacheRoute";
    static defaultProps: {
        local: boolean;
    };
    render(): JSX.Element;
}
