import {Component} from "../Component";
import {RouteProps} from "../Router";

export class ItemsPage extends Component<RouteProps> {
    render() {
        const div = document.createElement('div');
        div.append('ItemsPage');
        return div;
    };
}