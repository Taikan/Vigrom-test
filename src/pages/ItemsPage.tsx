import View from "../View";
import { RouteProps } from "../Router/Router";
import { PageLayout } from "../layouts/PageLayout";

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
      <PageLayout
        slots={{
          title: "ItemsPage",
          content: (
            <div>
              <button className="btn btn-primary" onclick={this.props.back}>
                Назад
              </button>
              <hr />
              <div className="row">
                {data.items.map(item => (
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="card bg-secondary text-white">
                      <div className="card-header bg-dark">{item.name}</div>
                      <div className="card-body">
                        <p className="card-text">{`Кол-во: ${item.quantity}`}</p>
                        <p className="card-text">{`Цена: ${item.price}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12">{`Total: ${data.total}`}</div>
              </div>
            </div>
          )
        }}
      />
    );
  }
}
