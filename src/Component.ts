
export abstract class Component<P = any> {
    public constructor(readonly props: P) {}
    abstract render(): string | HTMLElement;

    public mount(root: HTMLElement) {
        const content = this.render();
        if (typeof content === "string") {
            root.innerHTML = content;
        } else {
            root.innerHTML = '';
            root.append(content)
        }
    }
}

export  type ComponentConstructor<P> = (new (props: P) => Component<P>)
