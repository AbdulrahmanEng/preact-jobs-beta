import { h, Component } from 'preact';
import { route } from 'preact-router';
import cuid from 'cuid';
import { db } from '../../../firebase';

import Back from '../../components/back';

const PostForm = ({ handleSubmit }) => {
  return (
    <form className="post__form" onSubmit={handleSubmit}>
      <label className="form__label">Title</label>
      <input
        className="form__input"
        type="text"
        name="title"
        placeholder="e.g. JavaScript Engineer"
        required />
      <label className="form__label">Company Name</label>
      <input
        className="form__input"
        type="text"
        name="client"
        placeholder="e.g. Wallace Corp."
        required />
      <label className="form__label">Job Description</label>
      <textarea
        className="form__textArea"
        type="text"
        name="description"
        placeholder="e.g. We are looking for a developer with experience developing with Node.js and knowledge of machine learning. Contact us at hr@wallacecorp.com."
        required />
      <label className="form__label">Location</label>
      <input 
        className="form__input"
        type="text"
        name="location"
        placeholder="e.g. Tyrrell Building, California"
        required />
      <label className="form__label">Remote</label>
      <input 
        className="form__input--checkbox"
        type="checkbox"
        name="remote"
        checked="true" />
      <label className="form__label">Rate</label>
      <input
        className="form__input"
        type="text"
        name="rate"
        placeholder="e.g. $1000 p/h"
        required />
      <button className="button post-job" type="submit">Save</button>
    </form>
  );
};
export default class Post extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, client, description, location, remote, rate } = e.target;
    const id = cuid();
    const formData = {
      id: id,
      title: title.value,
      client: client.value,
      description: description.value,
      location: location.value,
      remote: remote.checked,
      rate: rate.value,
      date: Date.now()
    };

    // Save post to Firebase
    db.ref(`posts/${id}`).set(formData, () => {
      route('/', true);
    });
  }
  render() {
    return (
      <main className="post">
        <Back />
        <PostForm handleSubmit={this.handleSubmit}/>
      </main>
    );
  }
}