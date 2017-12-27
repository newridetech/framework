import express = require('express');

import Route from '../../../../framework/src/Route';

export default class get extends Route {
    createResponse(req: express.Request): Promise<string> {
        // todo: do not setup service until actually used
        return req.app.locals.services.take('AWS_SQS').then((sqs: AWS.SQS) => {
            return this.onSQSReady(req, sqs);
        });
    }

    onSQSReady(req: express.Request, sqs: AWS.SQS): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            sqs.getQueueUrl({
                QueueName: req.app.locals.dotenv.AWS_SQS_QUEUE_NAME,
            }, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.QueueUrl);
                }
            });
        });
    }
}
