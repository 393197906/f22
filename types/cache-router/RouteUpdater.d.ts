import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface UpdaterChildProps extends RouteComponentProps {
    currentPath: string;
    prevPath: string;
}
interface UpdaterProps {
    children: (option: UpdaterChildProps) => React.ReactNode;
    deps: string[];
}
export declare const RouteUpdater: React.ComponentType<UpdaterProps>;
export {};
