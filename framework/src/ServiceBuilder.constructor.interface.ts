import ServiceBuilder from './ServiceBuilder';

export default interface ServiceBuilderConstructor<T> {
    new(): ServiceBuilder<T>;
}
