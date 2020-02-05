import * as React from "react";
interface Props {
    children: () => React.ReactNode;
}
export declare class CachePage extends React.Component<Props> {
    shouldComponentUpdate(): boolean;
    render(): React.ReactNode;
}
export {};
