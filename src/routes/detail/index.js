import { h, Component } from 'preact';
import moment from 'moment';

import Back from '../../components/back';

export default class Detail extends Component {
  render({data},{}){
  return (
    <main className="detail">
      <Back />
      <div className="detail">
        <div className="detail__header">
          <h1 className="header__title">{data.title}</h1>
        {data.remote && <span className="badge badge--remote">Remote</span>}
        </div>
        <h3 className="detail__client">
        <i className="fa fa-briefcase" aria-hidden="true" />
          <span className="client__text">{data.client}</span>
      </h3>
        <h3 className="detail__rate">
        <i className="fa fa-money" aria-hidden="true" />
          <span className="rate__text">{data.rate}</span>
      </h3>
        <h3 className="detail__location">
        <i className="fa fa-map-o" aria-hidden="true" />
          <span className="location__text">{data.location}</span>
      </h3>
        <h4 className="detail__date">
          <i className="fa fa-clock-o" aria-hidden="true" />
          <span className="date__text">{moment(
          data.date
            ).fromNow()}
        </span>
        </h4>
        <p className="detail__description">{data.description}</p>
      </div>
    </main>
  );
  }
}