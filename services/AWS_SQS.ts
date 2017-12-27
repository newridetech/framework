/// <reference path="../typings/DotEnv.d.ts" />

import AWS = require('aws-sdk');

import ServiceBuilder from '../framework/src/ServiceBuilder';

export default class AWS_SQS extends ServiceBuilder<AWS.SQS> {
    before(dotenv: DotEnv) {
        AWS.config.update({
            accessKeyId: dotenv.AWS_ACCESS_KEY_ID,
            secretAccessKey: dotenv.AWS_SECRET_ACCESS_KEY,
            region: dotenv.AWS_REGION,
        });
    }

    build(dotenv: DotEnv): AWS.SQS {
        return new AWS.SQS({
            apiVersion: dotenv.AWS_SQS_API_VERSION
        });
    }
}
