import express = require('express');

import routes from './bootstrap/routes';
import services from './bootstrap/services';

export default function bootstrap(): Promise<express.Application> {
    const app: express.Application = express();

    return Promise.all([
        services(app),
        routes(app),
    ]).then(() => app);
}
