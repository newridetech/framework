import express = require('express');

export default interface Response {
    contents: string;

    send(res: express.Response): Promise<void>;
}
