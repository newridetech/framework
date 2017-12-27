import express = require('express');
import isPromise = require('is-promise');

import Response from './Response';
import ResponseInterface from './Response.interface';
import RouteInterface from './Route.interface';
import UnexpectedErrorResponse from './Response/UnexpectedError';

export type PossibleResponseBasicTypes = string | ResponseInterface;
export type PossibleResponse = Promise<PossibleResponseBasicTypes> | PossibleResponseBasicTypes;

function normalizeStringResponse(response: string): Promise<ResponseInterface> {
    return Promise.resolve(new Response(response));
}

function normalizeBasicTypesResponse(response: PossibleResponseBasicTypes): Promise<ResponseInterface> {
    if ('string' === typeof response) {
        return normalizeStringResponse(response);
    }

    return Promise.resolve(response);
}

function normalizePromiseResponse(response: Promise<PossibleResponseBasicTypes>): Promise<ResponseInterface> {
    return response.then(normalizeBasicTypesResponse);
}

function normalizeResponse(response: PossibleResponse): Promise<ResponseInterface> {
    if (isPromise(response)) {
        return normalizePromiseResponse(response);
    }

    return normalizeBasicTypesResponse(response);
}

abstract class Route implements RouteInterface {
    abstract createResponse(req: express.Request): PossibleResponse;

    createExpressRequestHandler(): express.RequestHandler {
        return this.handle.bind(this);
    }

    handle(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        return normalizeResponse(this.createResponse(req))
            .then((response: ResponseInterface) => response.send(res))
            .catch((err: Error) => new UnexpectedErrorResponse(err).send(res))
            .then(next)
        ;
    }
}

export default Route;
