// import express = require('express');

import Route from '../framework/src/Route';

export default class get extends Route {
    createResponse(/* req: express.Request */): string {
        // console.log(req.query);

        return 'OK';
    }
}
