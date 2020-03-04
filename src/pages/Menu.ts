import {Component} from "../Component";
import {RouteProps} from "../Router";

export class Menu extends Component<RouteProps> {
    render() {
        // noinspection HtmlUnknownAnchorTarget
        return `
<nav class="navbar navbar-expand navbar-light bg-light">
    <ul class="navbar-nav">
        <li class="nav-item">
            <a href="#items" class="nav-link">Товары</a>
        </li>
        <li class="nav-item">
            <a href="#about" class="nav-link">О нас</a>
        </li>
    </ul>
</nav>
        `;
    };
}
