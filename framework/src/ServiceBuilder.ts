/// <reference path="../../typings/DotEnv.d.ts" />

import toPromise from '../helpers/toPromise';

export default abstract class ServiceBuilder<T> {
    abstract build(dotenv: DotEnv): Promise<T> | T;

    before(_dotenv: DotEnv): Promise<void> | void {}

    buildWithLifecycle(dotenv: DotEnv): Promise<T> {
        return toPromise<T>(this.build(dotenv));
    }
}
