import express = require('express');
import globStream = require('glob-stream');
import path = require('path');

import glob from '../helpers/glob';
import RouteConstructorInterface from '../src/Route.constructor.interface';

function onRouteFileFound(app: express.Application, file: globStream.Entry): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const splitted: Array<string> = path.relative(file.base, file.path).split(path.sep);
        const method: string = path.basename(splitted.pop() || '', '.ts');
        const pathname: string = '/' + splitted.join('/');
        const Route: RouteConstructorInterface = require(file.path).default;

        console.log(`found route: ${method.toUpperCase()} ${pathname}`);
        switch (method) {
            case 'get':
                app.get(pathname, (new Route()).createExpressRequestHandler());
                return void resolve();
        }

        return void reject(new Error(`Unknown request method: ${method}`));
    });
}

export default function routes(app: express.Application): Promise<express.Application> {
    return glob('./**/*.ts', {
        cwd: './routes',
    }, (file: globStream.Entry) => onRouteFileFound(app, file)).then(function () {
        console.log('routes glob is done');

        return app;
    });
}
