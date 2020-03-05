import {Component, createElement} from "../Component";
import {RouteProps} from "../Router";

const data = {
    items: [
        {name: "item1", quantity: 1, price: 20},
        {name: "item2", quantity: 6, price: 5},
        {name: "item3", quantity: 3, price: 30},
    ],
    total: 3
};

/** @jsx createElement */

export class ItemsPage extends Component<RouteProps> {
    render() {
        return (
            <div>
                <button className="btn btn-primary" onclick={() => this.props.history.goBack()}>Назад</button>
                <div className="row">
                    {data.items.map(item => (
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">{item.name}</div>
                                    <p className="card-text">{`Кол-во: ${item.quantity}`}</p>
                                    <p className="card-text">{`Цена: ${item.price}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-12">
                        {`Total: ${data.total}`}
                    </div>
                </div>
            </div>
        );
    };
}