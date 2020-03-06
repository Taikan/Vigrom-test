import View from "../View";
import { DeclarationNode } from "../View/types";

type Props = {
  slots: {
    header?: DeclarationNode;
    title: string;
    content: DeclarationNode;
  };
};

export class PageLayout extends View.Component<Props> {
  render() {
    const { title, content, header } = this.props.slots;
    return [
      <header className="navbar navbar-dark bg-primary ">
        <div className="container">
          <div>
            <a href="#/" className="navbar-brand">
              Vigrom SPA
            </a>
          </div>
          <div>{header}</div>
        </div>
      </header>,
      <main className="container my-4 mx-auto">
        <div className="h1">{title}</div>
        <hr />
        {content}
      </main>,
      <footer>
        <hr />
        <div className="container">Anton Stankevich</div>
      </footer>
    ];
  }
}
