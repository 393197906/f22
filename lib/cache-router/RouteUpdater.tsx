import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

interface UpdaterChildProps extends RouteComponentProps {
    currentPath: string,
    prevPath: string
}

interface UpdaterProps {
    children: (option: UpdaterChildProps) => React.ReactNode;
    deps: string[]
}

class Updater extends React.Component<UpdaterProps & RouteComponentProps> {
    protected prevPath: string = "";

    shouldComponentUpdate(nextProps: Readonly<UpdaterChildProps & UpdaterProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps.location.pathname !== this.prevPath || nextProps.deps.join(",") !== this.props.deps.join(",");
    }

    render() {
        let {
            children,
            ...options
        } = this.props;
        const prevPath = this.prevPath
        this.prevPath = options.location.pathname;
        return typeof children === "function" ? children({
            currentPath: this.prevPath,
            prevPath,
            ...options
        }) : null;
    }
}

export const RouteUpdater: React.ComponentType<UpdaterProps> = withRouter(Updater) as any;
