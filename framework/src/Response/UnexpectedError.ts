import Response from '../Response';

export default class UnexpectedError extends Response {
    constructor(err: Error) {
        super(err.message);
    }
}
