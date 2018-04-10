import { h, Component } from 'preact';
import Jobs from '../../components/jobs';
import Loader from '../../components/loader';
import { isEmpty, lower, upper } from '../../../utilities/utilities';

class HomeForm extends Component {
  constructor(props){
    super(props);
  }
  render(props, {}){
    return (
      <form className="home__form" onSubmit={props.handleSubmit}>
        <input
          type="text"
          className="form__input"
          placeholder="Location"
          value={props.location}
          onChange={props.handleChange} />
        <select
          className="form__options"
          value={props.selectValue}
          onChange={props.handleSelect}>
          <option>All</option>
          <option>Onsite</option>
          <option>Remote</option>
        </select>
        <button type="submit" className="button search-job" style={{
          lineHeight:'initial'
        }}>Search</button>
      </form>
    )
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      selectValue: "All",
      jobs: Object.values(props.jobs),
      filteredJobs: [],
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleChange(event) {
    this.setState({ location: event.target.value });
  }
  handleSubmit(event) {
//     Filter out jobs whose location doesn't match
    const filtered = this.state.jobs.filter(job => {
//       Search for input string in location, return if match
      if (lower(job.location).search(lower(this.state.location)) !==-1) {
        return job;
      }
    });

    this.setState({ filteredJobs: filtered });
    event.preventDefault();
  }
  handleSelect(event) {
    switch (upper(event.target.value)) {
      case 'ALL':
        this.setState({ selectValue: 'All' });
        this.setState({ filteredJobs: this.state.jobs });
        break;
      case 'ONSITE':
        this.setState({ selectValue: 'Onsite' });
        this.setState({ filteredJobs: this.state.jobs.filter(j => !j.remote) });
        break;
      case 'REMOTE':
        this.setState({ selectValue: 'Remote' });
        this.setState({ filteredJobs: this.state.jobs.filter(j => j.remote) });
        break;
      default:
        return;
    }
  }
  componentDidMount(){
    // if posts exist set loading to false
    if(!isEmpty(this.state.jobs[0])){
    this.setState({loading:false});
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    // add posts from props if none exist and set loading to false
    if(isEmpty(this.state.jobs[0])){
      this.setState({jobs:nextProps.jobs});
      this.setState({loading: false});
    }
  }
  render({},{jobs,filteredJobs}) {
    // Return filteredJobs if filtering is done, else return jobs.
    const filteredOrAll = this.state.filteredJobs.length > 0?filteredJobs : jobs;
    // Sort the posts from earliest to latest.
    const data = filteredOrAll.sort((a, b) => b.date - a.date);
    return (
    <main className="home">
      <HomeForm 
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange} 
        handleSelect={this.handleSelect}
        location={this.state.location} 
        selectValue={this.state.selectValue} />
        {this.state.loading?<Loader/>:(
            <Jobs data={data} filter={this.props.filter} />
        )}
    </main>
    );
  }
}