import express = require('express');
import firebase = require('firebase');

import Route from '../../framework/src/Route';

export default class get extends Route {
    createResponse(req: express.Request): Promise<string> {
        return req.app.locals.services.take('Firebase').then(this.onFirebaseReady);
    }

    onFirebaseReady(app: firebase.app.App): Promise<string> {
        const database: firebase.database.Database = app.database();

        return database.ref().set({
            'hello': 'world',
        }).then(() => 'xD');
    }
}
