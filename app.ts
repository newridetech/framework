import express = require('express');

import bootstrap from './framework/bootstrap';

bootstrap().then((app: express.Application) => {
    app.listen(3000, function () {
        console.log('app is listening');
    });
});
