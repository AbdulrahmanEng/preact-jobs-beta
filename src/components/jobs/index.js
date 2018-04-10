import { h, Component } from 'preact';
import moment from 'moment';

const Jobs = ({data, filter}) => {
  return (
    <ul className="jobs">
      {data.map(job => {
        return (
          <li key={job.id} className="job">
            <div className="row">
              <div className="col-6">
                <div className="job__title">
                  <a className="title__text" href={"/job/" + job.id} onClick={() => filter(job.id)}>{job.title}</a>
                </div>
                <div className="job__client">{job.client}</div>
              </div>
              <div className="col-6">
                {job.remote && (
                  <div className="badge badge--remote">Remote</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="job__date">
                  <i class="fa fa-clock-o" aria-hidden="true" />
                  <span className="date__text">{moment(job.date).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="job__location">
                  <i class="fa fa-map-marker" aria-hidden="true" />
                  <span className="location__text">{job.location}</span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  )
}

export default Jobs;