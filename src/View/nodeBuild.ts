import { ComponentConstructor } from "./Component";
import {
  ElementDeclaration,
  DeclarationNode,
  DeclarationNodeArray,
  INode
} from "./types";

class PrimitiveNode implements INode {
  protected text: string;

  constructor(text: string | number | null | false | undefined) {
    this.text = String(text);
  }

  mount() {
    return document.createTextNode(this.text);
  }
}

const isEvent = name => name.startsWith("on");
const isAttribute = name => !isEvent(name) && name != "children";

class DomNode implements INode {
  constructor(protected element: ElementDeclaration<any, string>) {}

  mount() {
    const { type, props } = this.element;

    const dom = document.createElement(type);

    Object.keys(props)
      .filter(isAttribute)
      .forEach(name => {
        const value = props[name];
        if (value != null && value !== false) {
          // тут явно не все ситуации обрабатываются, но пока сойдет
          if (name === "className") {
            dom.setAttribute("class", value);
          } else {
            dom[name] = value;
          }
        }
      });

    Object.keys(props)
      .filter(isEvent)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      });

    const childElements = props.children || [];
    const childNodes = childElements.filter(Boolean).map(createNode);

    childNodes
      .map(childInstance => childInstance.mount())
      .forEach(childDom =>
        dom.append(...(Array.isArray(childDom) ? childDom : [childDom]))
      );

    return dom;
  }
}

class CustomNode implements INode {
  constructor(
    protected element: ElementDeclaration<any, ComponentConstructor<any>>
  ) {}

  mount() {
    const { type, props } = this.element;

    const instance = new type(props);
    const childElement = instance.render();
    const node = createNode(childElement);
    return node.mount();
  }
}

class ArrayNode implements INode {
  constructor(protected elements: DeclarationNodeArray) {}

  mount() {
    const childNodes = this.elements.map(createNode);
    const domList = childNodes.map(childInstance => childInstance.mount());
    return domList.flat();
  }
}

export function createNode(element: DeclarationNode): INode {
  if (Array.isArray(element)) {
    return new ArrayNode(element);
  } else if (
    typeof element === "string" ||
    typeof element === "number" ||
    !element
  ) {
    return new PrimitiveNode(element);
  } else if (typeof element.type === "string") {
    // @ts-ignore
    return new DomNode(element);
  } else {
    // @ts-ignore
    return new CustomNode(element);
  }
}
