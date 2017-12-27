import dotenv = require('dotenv');
import express = require('express');
import globStream = require('glob-stream');
import path = require('path');

import glob from '../helpers/glob';
import ServiceBuilderConstructorInterface from '../src/ServiceBuilder.constructor.interface';
import ServiceManager from '../src/ServiceManager';

function onServiceFileFound(app: express.Application, file: globStream.Entry): Promise<void> {
    return new Promise<void>(resolve => {
        const ServiceBuilder: ServiceBuilderConstructorInterface<any> = require(file.path).default;
        const serviceName: string = path.basename(file.path, '.ts');

        console.log(`found service: ${serviceName}`);
        app.locals.services.set(serviceName, new ServiceBuilder());

        resolve();
    });
}

export default function services(app: express.Application): Promise<express.Application> {
    const config: object | undefined = dotenv.config().parsed;

    if ('undefined' === typeof config) {
        throw new Error('Unable to read .env file.');
    }

    app.locals.dotenv = config;

    const serviceManager = new ServiceManager(<DotEnv>config);

    app.locals.services = serviceManager;

    return glob('./**/*.ts', {
        cwd: './services',
    }, (file: globStream.Entry) => (
        onServiceFileFound(app, file)
    )).then(() => {
        console.log('services glob is done');

        return serviceManager.before();
    }).then(() => app);
}
