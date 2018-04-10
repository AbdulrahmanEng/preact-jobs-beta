import env from './env';

import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId
};
firebase.initializeApp(config);

export const db = firebase.database();

export default firebase;