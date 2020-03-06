import View from "../View";
import { RouteProps } from "../Router/Router";

const data = {
  items: [
    { name: "item1", quantity: 1, price: 20 },
    { name: "item2", quantity: 6, price: 5 },
    { name: "item3", quantity: 3, price: 30 }
  ],
  total: 3
};

export class ItemsPage extends View.Component<RouteProps> {
  render() {
    return (
      <div>
        <a className="btn btn-primary" href="#">
          Меню
        </a>
        <button className="btn btn-primary" onclick={this.props.back}>
          Назад
        </button>
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
          <div className="col-12">{`Total: ${data.total}`}</div>
        </div>
      </div>
    );
  }
}
