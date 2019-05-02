import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_SENDER_ID || ''
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  //timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
//const postsCollection = db.collection('posts')
//const commentsCollection = db.collection('comments')
//const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  //postsCollection,
  //commentsCollection,
  //likesCollection
}