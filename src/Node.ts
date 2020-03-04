import {ComponentConstructor, ElementDeclaration} from "./Component";

interface INode {
    mount(): Node
}

class PrimitiveNode implements INode {
    protected text: string;

    constructor(text: string|number) {
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

        Object.keys(props).filter(isAttribute).forEach(name => {
            const value = props[name];
            if (value != null && value !== false) {
                // тут явно не все ситуации обрабатываются, но пока сойдет
                if (name === 'className') {
                    dom.setAttribute('class', value);
                } else {
                    dom[name] = value;
                }
            }
        });

        Object.keys(props).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, props[name]);
        });

        const childElements = props.children || [];
        const childNodes = childElements.map(createNode);

        childNodes.map(childInstance => childInstance.mount())
            .forEach(childDom => dom.appendChild(childDom));

        return dom;
    }
}

class CustomNode implements INode {
    constructor(protected element: ElementDeclaration<any, ComponentConstructor<any>>) {}

    mount() {
        const { type, props } = this.element;

        const instance = new type(props);
        const childElement = instance.render();
        const node = createNode(childElement);
        return node.mount();
    }
}

export function createNode(element: ElementDeclaration | string | number): INode {
    if (typeof element === "string" || typeof element === "number") {
        return new PrimitiveNode(element);
    } else if (typeof element.type === "string") {
        // @ts-ignore
        return new DomNode(element);
    } else {
        // @ts-ignore
        return new CustomNode(element);
    }
}
