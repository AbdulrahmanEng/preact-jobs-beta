import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Navigation extends Component {
  render(){
    return (
    <nav>
      <ul className="navigation">
        <li className="navigation__item">
          <Link href="/" id="brand">⚛ Preact Jobs</Link>
        </li>
        <li className="navigation__item">
          <Link href="/post" className="button post-job">Post a Job</Link>
        </li>
      </ul>
    </nav>
    );
  }
}