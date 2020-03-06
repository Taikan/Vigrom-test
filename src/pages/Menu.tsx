import View from "../View";
import { RouteProps } from "../Router/Router";

export class Menu extends View.Component<RouteProps> {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#items" className="nav-link">
              Товары
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              О нас
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
