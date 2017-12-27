/// <reference path="../../typings/DotEnv.d.ts" />

import ServiceBuilder from './ServiceBuilder';
import toPromise from '../helpers/toPromise';

export default class ServiceManager extends Map<string, ServiceBuilder<any>> {
    private dotenv: DotEnv;

    constructor(dotenv: DotEnv) {
        super();

        this.dotenv = dotenv;
    }

    before(): Promise<void> {
        const services: Array<Promise<any>> = [];

        for (let [, service] of this) {
            services.push(toPromise<any>(service.before(this.dotenv)));
        }

        return Promise.all(services).then(ret => void ret);
    }

    take(name: string): Promise<any> {
        const serviceBuilder: ServiceBuilder<any> | undefined = this.get(name);

        if (undefined === serviceBuilder) {
            return Promise.reject(new Error(`No such service: ${name}`));
        }

        return serviceBuilder.buildWithLifecycle(this.dotenv);
    }
}
