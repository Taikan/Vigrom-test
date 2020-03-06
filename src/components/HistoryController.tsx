import View from "../View";
import { DebugProps } from "../Router/Router";

export class HistoryController extends View.Component<DebugProps> {
  render() {
    const { index, list, path, back, forward } = this.props;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-auto">
            <button className="btn btn-primary" onClick={back}>
              Назад
            </button>
          </div>
          <div className="col-auto order-md-2 ml-auto">
            <button className="btn btn-primary" onClick={forward}>
              Вперед
            </button>
          </div>
          <div className="w-100 d-md-none" />
          <div className="col" style="position: relative;">
            <ul className="list-group">
              {list.map((hpath, i) => (
                <li className="list-group-item d-flex">
                  <a href={`#${hpath}`} className="">
                    {hpath}
                  </a>
                  {index === i && (
                    <span className="badge badge-secondary ml-auto">
                      Current hash {path}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
