import express = require('express');

import feedAppWithRoutes from './bootstrap/feedAppWithRoutes';
import feedAppWithServices from './bootstrap/feedAppWithServices';

export default function bootstrap(): Promise<express.Application> {
    const app: express.Application = express();

    return Promise.all([
        feedAppWithServices(app),
        feedAppWithRoutes(app),
    ]).then(() => app);
}
