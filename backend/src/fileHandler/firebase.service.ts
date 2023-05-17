import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from '../firebase-admin-sdk.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const serviceAccount = require('../firebase-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: 'gs://jobsite-385401.appspot.com',
});

export const firebaseApp = admin.app();
export const storageBucket = firebaseApp.storage().bucket();
