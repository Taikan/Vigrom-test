import View from "../View";
import { RouteProps } from "../Router/Router";
import { PageLayout } from "../layouts/PageLayout";

export class Menu extends View.Component<RouteProps> {
  render() {
    return (
      <PageLayout
        slots={{
          title: "Menu",
          content: (
            <div>
              <button className="btn btn-primary" onclick={this.props.back}>
                Назад
              </button>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="#items" className="">
                    Товары
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#about" className="">
                    О нас
                  </a>
                </li>
              </ul>
            </div>
          )
        }}
      />
    );
  }
}
