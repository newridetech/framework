/// <reference path="../typings/DotEnv.d.ts" />

import firebase = require('firebase');

import ServiceBuilderWithCache from '../framework/src/ServiceBuilder/Cached';

export default class Firebase extends ServiceBuilderWithCache<firebase.app.App> {
    build(dotenv: DotEnv): firebase.app.App {
        return firebase.initializeApp({
            apiKey: dotenv.FIREBASE_API_KEY,
            authDomain: dotenv.FIREBASE_AUTH_DOMAIN,
            databaseURL: dotenv.FIREBASE_DATABASE_URL,
            projectId: dotenv.FIREBASE_PROJECT_ID,
            storageBucket: dotenv.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: dotenv.FIREBASE_MESSAGING_SENDER_ID,
        });
    }
}
