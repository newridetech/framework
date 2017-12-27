import express = require('express');

import Route from '../../../../framework/src/Route';

export default class get extends Route {
    createResponse(req: express.Request): Promise<string> {
        // todo: do not setup service until actually used
        return req.app.locals.services.take('AWS_SQS').then(this.onSQSReady);
    }

    onSQSReady(sqs: AWS.SQS): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            sqs.listQueues({}, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.stringify(data.QueueUrls));
                }
            });
        });
    }
}
