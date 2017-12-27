import isPromise = require('is-promise');

export default function toPromise<T>(item: Promise<T> | T): Promise<T> {
    if (isPromise(item)) {
        return <Promise<T>>item;
    }

    return Promise.resolve(item);
}
