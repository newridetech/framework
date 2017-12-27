import RouteInterface from './Route.interface';

export default interface RouteConstructor {
    new(): RouteInterface;
}
