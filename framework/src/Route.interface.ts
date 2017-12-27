import express = require('express');

export default interface Route {
    createExpressRequestHandler(): express.RequestHandler;
}
