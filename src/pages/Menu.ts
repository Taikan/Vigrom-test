import {Component, createElement} from "../Component";
import {RouteProps} from "../Router";

export class Menu extends Component<RouteProps> {
    render() {
        return createElement('nav', {
                    className: "navbar navbar-expand navbar-light bg-light",
                },
                createElement('ul', {
                        className: "navbar-nav",
                    },
                    createElement('li', {
                            className: "nav-item",
                        },
                        createElement('a', {
                                className: "nav-link",
                                href: "#items",
                            },
                            "Товары"
                        )
                    ),
                    createElement('li', {
                            className: "nav-item",
                        },
                        createElement('a', {
                                className: "nav-link",
                                href: "#about"
                            },
                            "О нас"
                        )
                    )
                )
            );
    };
}
