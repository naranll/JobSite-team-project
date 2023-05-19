import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase/app';
import * as serviceAccount from '../firebase-admin-sdk.json';
import { ServiceAccount } from 'firebase-admin';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDjbE6O3shnk1AKv2K540BlROevADwRMvI',
  authDomain: 'jobsite-385401.firebaseapp.com',
  projectId: 'jobsite-385401',
  storageBucket: 'jobsite-385401.appspot.com',
  messagingSenderId: '803243633007',
  appId: '1:803243633007:web:f8e6fdce88f24101f2209a',
  measurementId: 'G-BCT9Q53MLV',
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: 'gs://jobsite-385401.appspot.com',
});

// export const firebaseConfig = {
//   apiKey: 'AIzaSyDjbE6O3shnk1AKv2K540BlROevADwRMvI',
//   authDomain: 'jobsite-385401.firebaseapp.com',
//   projectId: 'jobsite-385401',
//   storageBucket: 'jobsite-385401.appspot.com',
//   messagingSenderId: '803243633007',
//   appId: '1:803243633007:web:f8e6fdce88f24101f2209a',
//   measurementId: 'G-BCT9Q53MLV',
// };

export { firebaseApp, admin };
