import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { db } from '../../firebase';
import { Provider } from 'preact-redux';

import Header from './header';
import Home from '../routes/home';
import Post from '../routes/post';
// import Home from 'async!../routes/home';
// import Post from 'async!../routes/post';
import Detail from '../routes/detail';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: [],
			selectedJob: {}
		};
		this.filter = this.filter.bind(this);
	}
	componentWillMount() {
		db.ref('posts').on('value', snapshot => {
			const store = Object.values(snapshot.val());
			this.setState({ jobs: store });
		});
	}
	
	/** Gets fired when the post title is clicked in Home component.
	 *	@param {string} id post id.
	 *  @fires App#setState sets selectedJob as the post that was filtered out
	 */
	filter(id) {
		// Return item whose id matches the id parameter.
		const filtered = this.state.jobs.filter(job => job.id === id);
		// Set selectedJob as the filteredJob
		this.setState({ selectedJob: filtered[0] });
	}
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	}
	
	render({ },{ jobs }) {
		return (
			<div id="app">
			<Provider>
				<div class="content">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" jobs={jobs} filter={this.filter} />
						<Detail path="/job/:id" data={this.state.selectedJob} />
						<Post path="/post" />
					</Router>
				</div>
				<footer class="footer">
					<div class="footer__text">Send suggestions & feedback to bydeinon@gmail.com.</div>
				</footer>
				</Provider>
			</div>
		);
	}
}