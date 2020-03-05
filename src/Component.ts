import { createNode } from "./Node";
import { ElementDeclaration } from "./types";

export abstract class Component<P = any> {
  public constructor(readonly props: P) {}
  abstract render(): ElementDeclaration | string | number;

  public renderToDom(root: HTMLElement) {
    const node = createNode(this.render());
    root.innerHTML = "";
    const domNode = node.mount();
    root.append(...(Array.isArray(domNode) ? domNode : [domNode]));
  }
}

export type ComponentConstructor<P> = new (props: P) => Component<P>;

export function createElement<P extends {}>(
  type: ComponentConstructor<P> | string,
  props: P,
  ...children
): ElementDeclaration<P> {
  return {
    type,
    props: {
      ...props,
      children
    }
  };
}
