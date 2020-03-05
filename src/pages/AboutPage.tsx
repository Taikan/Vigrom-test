import {Component, createElement} from "../Component";
import {RouteProps} from "../Router";

/** @jsx createElement */

export class AboutPage extends Component<RouteProps> {
    render() {
        return (
            <div>
                <button className="btn btn-primary" onclick={() => this.props.history.goBack()}>Назад</button>
                <div className="card">
                    <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
        )
    };
}
