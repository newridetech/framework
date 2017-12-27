import express = require('express');

import ResponseInterface from './Response.interface';

export default class Response implements ResponseInterface {
    public contents: string;

    constructor(contents: string) {
        this.contents = contents;
    }

    send(res: express.Response): Promise<void> {
        res.end(this.contents);

        return new Promise<void>(resolve => res.addListener('finish', resolve));
    }
}
