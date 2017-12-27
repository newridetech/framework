/// <reference path="../../../typings/DotEnv.d.ts" />

import isPromise = require('is-promise');
import ServiceBuilder from '../ServiceBuilder';

export default abstract class Cached<T> extends ServiceBuilder<T> {
    public cache?: Promise<T>;

    buildWithLifecycle(dotenv: DotEnv): Promise<T> {
        if (!isPromise(this.cache)) {
            this.cache = super.buildWithLifecycle(dotenv);
        }

        return this.cache;
    }
}
