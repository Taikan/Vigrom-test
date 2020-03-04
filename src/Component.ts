import {createNode} from "./Node";

export abstract class Component<P = any> {
    public constructor(readonly props: P) {}
    abstract render(): ElementDeclaration | string | number;

    public renderToDom(root: HTMLElement) {
        const node = createNode(this.render());
        root.innerHTML = '';
        root.append(node.mount());
    }
}

export  type ComponentConstructor<P> = (new (props: P) => Component<P>)

export interface ElementDeclaration<P = any, T extends string | ComponentConstructor<any> = string | ComponentConstructor<any>> {
    type: T,
    props: P
}

export function createElement<P extends {}>(
    type: ComponentConstructor<P>  | string,
    props: P,
    ...children
 ): ElementDeclaration<P> {
    return {
        type,
        props: {
            ...props,
            children,
        },
    }
}

